import React, { useState, useEffect } from 'react';
import {
  format,
  addDays,
  addMonths,
  subMonths,
  endOfMonth,
  startOfMonth,
  isSameDay,
  parseISO,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AgendaService } from 'src/service/agenda';
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
  const [attendances, setAttendances] = useState([]); // Guardando os atendimentos
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewingAttendances, setIsViewingAttendances] = useState(false); // Novo estado para verificar se estamos visualizando atendimentos
  const [formData, setFormData] = useState({
    tarefa: '',
    data: '',
    hora: '',
    descricao: '',
    status: '',
  });
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [attendedDates, setAttendedDates] = useState(new Set()); // Estado para armazenar datas com atendimentos
  const [editIndex, setEditIndex] = useState(null); // Índice do atendimento a ser editado
  const [plannerData, setPlannerData] = useState({}); // Estado para armazenar os atendimentos organizados

  useEffect(() => {
    fetchData();
  }, []);
 
  // Função para buscar os dados e organizar por mês e dia
  const fetchData = async () => {
    const agenda = await AgendaService.getAll(); // Obtém os atendimentos
    const updatedPlannerData = {};
    console.log('agenda',agenda)
    setAttendances(agenda)

    agenda.forEach((task) => {
      const data = parseISO(task.data); // Converte a data para formato Date
      const monthKey = format(data, 'yyyy-MM'); // Formato de chave para ano e mês (yyyy-MM)
      const day = data.getDate(); // Extraí o dia do mês

      // Organiza os dados no formato desejado
      if (!updatedPlannerData[monthKey]) {
        updatedPlannerData[monthKey] = {}; // Cria um novo mês se não existir
      }
      if (!updatedPlannerData[monthKey][day]) {
        updatedPlannerData[monthKey][day] = []; // Cria um novo array para o dia se não existir
      }
      updatedPlannerData[monthKey][day].push(task); // Adiciona o atendimento ao dia
    });

    // Atualiza o estado com os dados organizados
    setPlannerData(updatedPlannerData);

    // Atualiza o estado das datas atendidas
    const updatedDates = new Set(agenda.map((task) => format(parseISO(task.data), 'yyyy-MM-dd')));
    setAttendedDates(updatedDates);
  };
  

  const handleDelete = (index) => {
    const updatedAttendances = [...attendances];
    updatedAttendances.splice(index, 1); // Remove o atendimento pelo índice
    setAttendances(updatedAttendances);

  const updatedDates = new Set(updatedAttendances.map((attendance) => attendance.data));
  setAttendedDates(updatedDates);

      // Verifica se ainda há atendimentos na data selecionada
  const remainingAttendancesForDay = updatedAttendances.filter(
    (attendance) => attendance.data === format(selectedDay, 'yyyy-MM-dd')
  );

  if (remainingAttendancesForDay.length === 0) {
    closeModal(); // Fecha o modal
  }
};
const handleEdit = (index) => {
  const attendanceToEdit = attendances[index]; // Obtemos o atendimento a ser editado
  openModal(index);
  setFormData(attendanceToEdit); // Preenchemos o formulário com os dados existentes
  setEditIndex(index); // Armazenamos o índice do atendimento que está sendo editado
  attendances.splice(index,1);
  
};
 
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
       console.log('attendances',attendances)
      openAttendanceModal(selectedDay);
    }
  };

  const openModal = (date = null) => {
    setFormData({
      id_consultorio:1,
      tarefa: '',
      data: format(date, 'yyyy-MM-dd'),
      hora: '',
      descricao: '',
      status: '',
    });
    setIsModalOpen(true);
    setIsViewingAttendances(false); // Assegura que o modal está no estado de "novo atendimento"
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ tarefa: '', data: '', hora: '', descricao: '', status: '',id_consultorio:'' });
  };

  const openAttendanceModal = (date) => {
    const todaysAttendances = attendances.filter(
      (attendance) => attendance.data === format(date, 'yyyy-MM-dd')
    );
    setIsViewingAttendances(true);
    setFormData({ tarefa: '', data: '', hora: '', descricao: '', status: '', id_consultorio:'' });
    setSelectedDay(date);
    setIsModalOpen(true); // Abre o modal para visualizar atendimentos
  };

  const handleSave = (e) => {
    e.preventDefault();

    // Adiciona um novo atendimento na lista
    setAttendances((prevAttendances) => {
      const newAttendances = [...prevAttendances, formData];
      // Atualiza as datas com atendimentos
      setAttendedDates(new Set(newAttendances.map((attendance) => attendance.data)));
     
      return newAttendances;
    });
    AgendaService.insertData(formData);
    closeModal(); // Fecha o modal e limpa os dados do formulário
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
            {isViewingAttendances ? 'Atendimentos de ' + format(selectedDay, 'dd/MM/yyyy') : 'Novo Atendimento'}
          </Typography>
          <Container sx={{ padding: 3 }}>
            {isViewingAttendances ? (
              <List>
                {attendances
                  .filter((attendance) => attendance.data === format(selectedDay, 'yyyy-MM-dd'))
                  .map((attendance, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={`Nome: ${attendance.tarefa}`}
                        secondary={`Hora: ${attendance.hora} | Status: ${attendance.status} | Notas: ${attendance.descricao}`}
                      />
                          {/* Botão Editar */}
                <Button
                  onClick={() => handleEdit(index)} // Chama a função de edição com o índice do atendimento
                  color="primary"
                  sx={{ marginRight: 1 }}
                >
                  Editar
                </Button>
                {/* Botão Deletar */}
                <Button
                  onClick={() => handleDelete(index)} // Chama a função de exclusão com o índice do atendimento
                  color="error"
                >
                  Deletar
                </Button>
                    </ListItem>
                  ))}
              </List>
            ) : (
              <>
                <TextField
                  label="Nome do Atendimento"
                  value={formData.tarefa}
                  onChange={(e) => setFormData({ ...formData, tarefa: e.target.value })}
                  fullWidth
                  required
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Data"
                  type="date"
                  value={formData.data}
                  onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Horário"
                  type="time"
                  value={formData.hora}
                  onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Notas"
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                />
                {/* Botões para selecionar o status */}
                <div>
                  <Button
                    variant={formData.status === 'Aguardando Confirmação' ? 'contained' : 'outlined'}
                    color="warning"
                    onClick={() => setFormData({ ...formData, status: false })}
                    sx={{ marginRight: 2 }}
                  >
                    Aguardando Confirmação
                  </Button>
                  <Button
                    variant={formData.status === 'Confirmar Agendamento' ? 'contained' : 'outlined'}
                    color="success"
                    onClick={() => setFormData({ ...formData, status: true })}
                  >
                    Confirmar Agendamento
                  </Button>
                </div>

                <Button onClick={handleSave} variant="contained" type="submit" fullWidth sx={{ marginTop: 2 }}>
                  Salvar Atendimento
                </Button>
              </>
            )}
          </Container>
        </form>
      </Dialog>
    </Container>
  );
};

export default PlannerMensal;
