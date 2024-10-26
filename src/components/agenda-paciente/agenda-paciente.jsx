/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { format, addDays, parseISO, addMonths, subMonths, endOfWeek, isSameDay, endOfMonth, startOfWeek, isSameMonth, startOfMonth } from 'date-fns';

import { Grid, Paper, Button, Dialog, Container, TextField, Typography, IconButton, DialogTitle, DialogActions, DialogContent } from '@mui/material';

import Iconify from 'src/components/iconify';
import { AgendaService } from 'src/service/agenda';

const PlannerMensal = () => {

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [plannerData, setPlannerData] = useState([{}]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    taskName: '',
    taskDate: '',
    taskTime: '',
    taskNotes: ''
  });

   // Função para buscar os dados do banco e preencher o planner
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
  useEffect(() => {
    console.log('plannerData',plannerData)
  }, [plannerData]);

  const changeMonth = (offset) => {
    setCurrentMonth(offset > 0 ? addMonths(currentMonth, 1) : subMonths(currentMonth, 1));
  };

  const openModal = (task = null, date = null, index = null) => {
    if (task) {
      setEditMode(true);
      setSelectedDate(date);
      setEditIndex(index);
      setFormData({
        taskName: task.tarefa,
        taskDate: task.data,
        taskTime: task.hora,
        taskNotes: task.descricao
      });
    } else {
      setEditMode(false);
      setFormData({
        taskName: task.tarefa,
        taskDate: task.data,
        taskTime: task.hora,
        taskNotes: task.descricao
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
      descricao: taskNotes
    };

    // Enviar a nova tarefa para o banco de dados
    await AgendaService.insertData(task);

    // Atualiza o plannerData após a inserção
    const updatedPlannerData = { ...plannerData };

    if (!updatedPlannerData[monthKey]) {
      updatedPlannerData[monthKey] = {};
    }

    if (!updatedPlannerData[monthKey][day]) {
      updatedPlannerData[monthKey][day] = [];
    }

    if (editMode) {
      updatedPlannerData[monthKey][selectedDate.getDate()][editIndex] = task;
    } else {
      updatedPlannerData[monthKey][day].push(task);
    }

    setPlannerData(updatedPlannerData);
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
    localStorage.setItem('plannerData', JSON.stringify(updatedPlannerData));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(startOfMonth(currentMonth));
    const endDate = endOfWeek(endOfMonth(currentMonth));

    let day = startDate;
    while (day <= endDate) {
      const formattedDate = format(day, 'yyyy-MM-dd');
      const monthKey = format(day, 'yyyy-MM');

      const isCurrentMonth = isSameMonth(day, currentMonth);
      const isToday = isSameDay(day, new Date());

      days.push(
        <Grid item xs={1.6} key={formattedDate}>
          <Paper
            variant= 'outlined' 
           
            sx={{ padding: 2, backgroundColor: isToday ? '#f0f0f0' : 'inherit', cursor: 'pointer' }}
            // eslint-disable-next-line no-loop-func
            onClick={() => openModal(null, day)}
          >
            <Typography variant="h6">{format(day, 'd')}</Typography>
            {plannerData[monthKey] && plannerData[monthKey][day.getDate()] &&
              // eslint-disable-next-line no-loop-func
              plannerData[monthKey][day.getDate()].map((task, index) => (
                <Paper key={index} sx={{ padding: 1, marginTop: 1 }}>
                  <Typography variant="subtitle2">{task.hora}</Typography>
                  <Typography variant="body2">{task.tarefa}</Typography>
                  <IconButton size="small" onClick={() => editTask(day, index)}><Iconify icon="tabler:edit" /></IconButton>
                  <IconButton size="small" onClick={() => deleteTask(day, index)}><Iconify icon="material-symbols:delete-outline" /></IconButton>
                </Paper>
              ))}
          </Paper>
        </Grid>  
      );

      day = addDays(day, 1);
    }
    return days;
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Planner Mensal</Typography>
      <Grid container justifyContent="space-between" alignItems="center">
        <Button startIcon={<Iconify icon="eva:plus-fill"/>} onClick={() => changeMonth(-1)}>Anterior</Button>
        <Typography variant="h5">{format(currentMonth, 'MMMM yyyy')}</Typography>
        <Button endIcon={<Iconify icon="eva:plus-fill"/>} onClick={() => changeMonth(1)}>Próximo</Button>
      </Grid>
      <Grid container columnSpacing={19} sx={{marginTop: 2}}>
        {['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'].map((day) => (
          <Grid item xs={1} key={day}>
            <Typography variant="subtitle1" align="center">{day}</Typography>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={1}>
        {renderDays()}
      </Grid>

      <Dialog open={isModalOpen} onClose={closeModal}>
        <DialogTitle>{editMode ? 'Editar Tarefa' : 'Adicionar Tarefa'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Tarefa"
            name="taskName"
            value={formData.taskName}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            required
          />
          <TextField
            label=""
            name="taskDate"
            type="date"
            value={formData.taskDate}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            required
          />
          <TextField
            label=""
            name="taskTime"
            type="time"
            value={formData.taskTime}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            required
          />
          <TextField
            label="Notas"
            name="taskNotes"
            value={formData.taskNotes}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancelar</Button>
          <Button onClick={handleSubmit} color="primary">{editMode ? 'Salvar' : 'Adicionar'}</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PlannerMensal;
