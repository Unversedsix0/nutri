import React, { useState, useEffect } from 'react';
import {
  format,
  addDays,
  parseISO,
  addMonths,
  subMonths,
  endOfMonth,
  startOfMonth,
  isSameDay,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Grid,
  Paper,
  Button,
  Dialog,
  Container,
  TextField,
  Typography,
  IconButton,
  DialogTitle,
  DialogActions,
  DialogContent,
  Menu,
  MenuItem,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import { AgendaService } from 'src/service/agenda';

const PlannerMensal = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [plannerData, setPlannerData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    taskName: '',
    taskDate: '',
    taskTime: '',
    taskNotes: '',
  });
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  const handleDayClick = (event, day) => {
    event.preventDefault();
    setSelectedDay(day);
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
          }
        : null
    );
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const fetchData = async () => {
    const agenda = await AgendaService.getAll();
    const updatedPlannerData = {};

    agenda.forEach((task) => {
      const taskDate = parseISO(task.data);
      const monthKey = format(taskDate, 'yyyy-MM');
      const day = taskDate.getDate();

      if (!updatedPlannerData[monthKey]) {
        updatedPlannerData[monthKey] = {};
      }
      if (!updatedPlannerData[monthKey][day]) {
        updatedPlannerData[monthKey][day] = [];
      }

      updatedPlannerData[monthKey][day].push(task);
    });

    setPlannerData(updatedPlannerData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const changeMonth = (offset) => {
    setCurrentMonth(offset > 0 ? addMonths(currentMonth, 1) : subMonths(currentMonth, 1));
  };

  const openModal = (task = null, date = null, index = null) => {
    setEditMode(!!task);
    setSelectedDate(date);
    setEditIndex(index);
    setFormData({
      taskName: task?.tarefa || '',
      taskDate: task?.data || format(date, 'yyyy-MM-dd'),
      taskTime: task?.hora || '',
      taskNotes: task?.descricao || '',
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ taskName: '', taskDate: '', taskTime: '', taskNotes: '' });
  };

  const openViewModal = () => {
    setViewModalOpen(true);
    handleCloseContextMenu();
  };

  const closeViewModal = () => {
    setViewModalOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { taskName, taskDate, taskTime, taskNotes } = formData;
    const date = parseISO(taskDate);
    const day = date.getDate();
    const monthKey = format(date, 'yyyy-MM');

    const task = {
      id_paciente: 1,
      id_consultorio: 1,
      tarefa: taskName,
      data: taskDate,
      hora: taskTime,
      descricao: taskNotes,
    };

    if (editMode && selectedDate) {
      const originalDay = selectedDate.getDate();
      if (day === originalDay) {
        plannerData[monthKey][day][editIndex] = task;
      } else {
        plannerData[monthKey][originalDay].splice(editIndex, 1);
        if (!plannerData[monthKey][day]) {
          plannerData[monthKey][day] = [];
        }
        plannerData[monthKey][day].push(task);
      }
    } else {
      if (!plannerData[monthKey]) plannerData[monthKey] = {};
      if (!plannerData[monthKey][day]) plannerData[monthKey][day] = [];
      plannerData[monthKey][day].push(task);
    }

    await AgendaService.insertData(task);
    setPlannerData({ ...plannerData });
    closeModal();
  };

  const editTask = (date, index) => {
    const monthKey = format(date, 'yyyy-MM');
    const task = plannerData[monthKey][date.getDate()][index];
    openModal(task, date, index);
  };

  const deleteTask = (date, index) => {
    const monthKey = format(date, 'yyyy-MM');
    const updatedPlannerData = { ...plannerData };
    updatedPlannerData[monthKey][date.getDate()].splice(index, 1);

    if (updatedPlannerData[monthKey][date.getDate()].length === 0) {
      delete updatedPlannerData[monthKey][date.getDate()];
    }
    setPlannerData(updatedPlannerData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const renderDays = () => {
    const days = [];
    const startDate = startOfMonth(currentMonth);
    const endDate = endOfMonth(currentMonth);

    let day = startDate;
    while (day <= endDate) {
      const formattedDate = format(day, 'yyyy-MM-dd');
      const monthKey = format(day, 'yyyy-MM');
      const isToday = isSameDay(day, new Date());
      const hasTask = plannerData[monthKey]?.[day.getDate()]?.length > 0;

      let backgroundColor;
      if (isToday) {
        backgroundColor = '#f0f0f0';
      } else if (hasTask) {
        backgroundColor = '#c8e6c9';
      } else {
        backgroundColor = 'inherit';
      }

      days.push(
        ((currentDay) => (
          <Grid item xs={4} sm={2} md={1.6} key={formattedDate}>
  <Paper
    variant="outlined"
    sx={{
      padding: 2,
      backgroundColor,
      cursor: 'pointer',
    }}
    onClick={(event) => handleDayClick(event, currentDay)}
  >
    <Typography variant="h6">{format(currentDay, 'd')}</Typography>
    {plannerData[monthKey]?.[currentDay.getDate()]?.map((task, index) => (
      <Paper key={index} sx={{ padding: 1, marginTop: 1 }}>
        <Typography variant="subtitle2">{task.hora}</Typography>
        <Typography variant="body2">{task.tarefa}</Typography>
        <IconButton size="small" onClick={() => editTask(currentDay, index)}>
          <Iconify icon="tabler:edit" />
        </IconButton>
        <IconButton size="small" onClick={() => deleteTask(currentDay, index)}>
          <Iconify icon="material-symbols:delete-outline" />
        </IconButton>
      </Paper>
    ))}
  </Paper>
</Grid>

        ))(day)
      );

      day = addDays(day, 1);
    }
    return days;
  };

  return (
    <Container>
      <Typography variant="h4">Planner Mensal</Typography>
      <Grid container justifyContent="space-between">
        <Button onClick={() => changeMonth(-1)}>Anterior</Button>
        <Typography variant="h5">{format(currentMonth, 'MMMM yyyy', { locale: ptBR })}</Typography>
        <Button onClick={() => changeMonth(1)}>Próximo</Button>
      </Grid>
      <Grid container spacing={1}>{renderDays()}</Grid>

      <Dialog open={isModalOpen} onClose={closeModal}>
        <DialogTitle>{editMode ? 'Editar Tarefa' : 'Adicionar Tarefa'}</DialogTitle>
        <DialogContent>
          <TextField label="Tarefa" name="taskName" value={formData.taskName} onChange={handleInputChange} fullWidth required />
          <TextField label="Data" name="taskDate" type="date" value={formData.taskDate} onChange={handleInputChange} fullWidth required />
          <TextField label="Hora" name="taskTime" type="time" value={formData.taskTime} onChange={handleInputChange} fullWidth required />
          <TextField label="Notas" name="taskNotes" value={formData.taskNotes} onChange={handleInputChange} fullWidth multiline rows={3} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancelar</Button>
          <Button onClick={handleSubmit}>{editMode ? 'Salvar' : 'Adicionar'}</Button>
        </DialogActions>
      </Dialog>

      <Menu
        open={contextMenu !== null}
        onClose={handleCloseContextMenu}
        anchorReference="anchorPosition"
        anchorPosition={contextMenu ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined}
      >
        <MenuItem onClick={() => openModal(null, selectedDay)}>Realizar novo atendimento</MenuItem>
      </Menu>
    </Container>
  );
};

export default PlannerMensal;