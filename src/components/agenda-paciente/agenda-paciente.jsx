import React, { useState, useEffect } from 'react';
import {
  format,
  addDays,
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
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const PlannerMensal = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [plannerData, setPlannerData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    taskName: '',
    taskDate: '',
    taskTime: '',
    taskNotes: '',
  });
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [attendances, setAttendances] = useState([]);
  const [attendedDates, setAttendedDates] = useState(new Set()); // Estado para armazenar datas com atendimentos
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);

  // Variáveis de estado
const [editingIndex, setEditingIndex] = useState(null); // Índice do atendimento sendo editado

// Função para abrir o modal de edição
const handleEdit = (index) => {
  setFormData(attendances[index]); // Preenche o formulário com os dados existentes
  setEditingIndex(index); // Define o índice do atendimento sendo editado
  setIsModalOpen(true); // Abre o modal
};

// Função para salvar o atendimento
const handleSave= (e) => {
  e.preventDefault();

  if (editingIndex !== null) {
    // Atualiza o atendimento existente
    const updatedAttendances = [...attendances];
    updatedAttendances[editingIndex] = formData;
    setAttendances(updatedAttendances);
  } else {
    // Cria um novo atendimento
    setAttendances([...attendances, formData]);
    handleHighlightDate(formData.taskDate);
  }

  // Fecha o modal e reseta o formulário
  setIsModalOpen(false);
  setFormData({ taskName: '', taskDate: '', taskTime: '', taskNotes: '' });
  setEditingIndex(null); // Reseta o índice de edição
};


// Função para deletar um atendimento
const handleDelete = (index) => {
  const updatedAttendances = attendances.filter((_, i) => i !== index); // Remove pelo índice
  setAttendances(updatedAttendances);

  // Remove destaque do calendário se não houver mais atendimentos
  const remainingDates = updatedAttendances.map((attendance) => attendance.taskDate);
  setAttendedDates(new Set(remainingDates));

};
  const fetchData = async () => {
    // Simulando carregamento de dados
    setPlannerData({});
  };

  useEffect(() => {
    fetchData();
  }, []);

  const changeMonth = (offset) => {
    setCurrentMonth(offset > 0 ? addMonths(currentMonth, 1) : subMonths(currentMonth, 1));
  };

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

  const handleMenuOption = (option) => {
    handleCloseContextMenu();
    if (option === 'novoAtendimento') {
      openModal(selectedDay);
    } else if (option === 'visualizarAtendimentos') {
      openAttendanceModal(selectedDay);
    }
  };

  const openModal = (date = null) => {
    setFormData({
      taskName: '',
      taskDate: format(date, 'yyyy-MM-dd'),
      taskTime: '',
      taskNotes: '',
    });
    setIsModalOpen(true);
  };
  // Fecha o modal
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ taskName: '', taskDate: '', taskTime: '', taskNotes: '' });
  };

  // Função para destacar datas atendidas
const handleHighlightDate = (date) => {
  setAttendedDates((prevAttendedDates) => new Set([...prevAttendedDates, date]));
};

  const openAttendanceModal = (day) => {
    const dayAttendances = attendances.filter(
      (attendance) => attendance.taskDate === format(day, 'yyyy-MM-dd')
    );
    setAttendances(dayAttendances); // Atualiza com os atendimentos do dia
    setIsAttendanceModalOpen(true);
  };

  const closeAttendanceModal = () => {
    setIsAttendanceModalOpen(false);
  };

  const renderDays = () => {
    const days = [];
    const startDate = startOfMonth(currentMonth);
    const endDate = endOfMonth(currentMonth);

    let day = startDate;
    while (day <= endDate) {
      const formattedDate = format(day, 'yyyy-MM-dd');
      const isToday = isSameDay(day, new Date());
      const hasAttendance = attendedDates.has(formattedDate); // Verifica se a data tem atendimento

      let backgroundColor = hasAttendance ? '#87CEFA' : (isToday ? '#E0FFFF' : 'white'); 

      days.push(
        ((currentDay) => (
          <Grid item xs={4} sm={2} md={1.6} key={formattedDate}>
            <Paper
              variant="outlined"
              sx={{
                padding: 2,
                backgroundColor,
                cursor: 'pointer',
                borderRadius: 2,
                transition: '0.3s',
                '&:hover': { backgroundColor: '#E3F2FD' },
              }}
              onClick={(event) => handleDayClick(event, currentDay)}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {format(currentDay, 'd')}
              </Typography>
            </Paper>
          </Grid>
        ))(day)
      );

      day = addDays(day, 1);
    }
    return days;
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
        Planner Mensal
      </Typography>
      <Grid container justifyContent="space-between" alignItems="center">
        <Button variant="contained" color="primary" onClick={() => changeMonth(-1)}>
          Anterior
        </Button>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          {format(currentMonth, 'MMMM yyyy', { locale: ptBR })}
        </Typography>
        <Button variant="contained" color="primary" onClick={() => changeMonth(1)}>
          Próximo
        </Button>
      </Grid>
      <Grid container spacing={1} sx={{ marginTop: 2 }}>
        {renderDays()}
      </Grid>

      {/* Menu de contexto */}
      <Menu
        open={contextMenu !== null}
        onClose={handleCloseContextMenu}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={() => handleMenuOption('novoAtendimento')}>Realizar novo atendimento</MenuItem>
        <MenuItem onClick={() => handleMenuOption('visualizarAtendimentos')}>Visualizar atendimentos</MenuItem>
      </Menu>

      {/* Modal de criação de novo atendimento */}
      <Dialog open={isModalOpen} onClose={closeModal} maxWidth="sm" fullWidth>
        <form onSubmit={handleSave}>
          <Typography variant="h6" align="center" sx={{ marginTop: 2, fontWeight: 'bold' }}>
            Novo Atendimento
          </Typography>
          <Container sx={{ padding: 3 }}>
            <TextField
              label="Nome do Atendimento"
              value={formData.taskName}
              onChange={(e) => setFormData({ ...formData, taskName: e.target.value })}
              fullWidth
              required
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Data"
              type="date"
              value={formData.taskDate}
              onChange={(e) => setFormData({ ...formData, taskDate: e.target.value })}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Horário"
              type="time"
              value={formData.taskTime}
              onChange={(e) => setFormData({ ...formData, taskTime: e.target.value })}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Notas"
              value={formData.taskNotes}
              onChange={(e) => setFormData({ ...formData, taskNotes: e.target.value })}
              fullWidth
              multiline
              rows={4}
              sx={{ marginBottom: 2 }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Salvar
            </Button>
          </Container>
        </form>
      </Dialog>

      {/* Modal para visualizar atendimentos */}
      <Dialog open={isAttendanceModalOpen} onClose={closeAttendanceModal} maxWidth="sm" fullWidth>
        <Typography variant="h6" align="center" sx={{ marginTop: 2, fontWeight: 'bold' }}>
          Atendimentos do Dia
        </Typography>
        <List>
          {attendances.map((attendance, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={attendance.taskName}
                secondary={`Hora: ${attendance.taskTime} - Notas: ${attendance.taskNotes}`}
              />
              <Button variant="contained" color="primary" onClick={() => handleDelete(index)}  fullWidth sx={{ marginTop: 5, width: '40px'}}>
          Deletar
        </Button>
        <Button variant="contained" color="primary" onClick={() => handleEdit(index)} fullWidth sx={{ marginTop: 5, width: '40px'}}>
          Editar
        </Button>
            </ListItem>
          
          ))}
        </List>
        <Button variant="contained" color="primary" onClick={closeAttendanceModal} fullWidth sx={{ marginTop: 5 }}>
          Fechar
        </Button>
      </Dialog>
    </Container>
  );
};

export default PlannerMensal;
