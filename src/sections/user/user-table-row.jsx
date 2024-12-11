import { useState ,useEffect} from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import ModalPaciente from 'src/components/modal-paciente';


import { PacienteService } from 'src/service/paciente';
import { EnderecoService } from 'src/service/endereco';
// ----------------------------------------------------------------------

export default function UserTableRow({
  id,
  selected,
  name,
  avatarUrl,
  company,
  email,
  status,
  handleClick,
  paciente
}) {
  const [open, setOpen] = useState(null);
  const [ endereco , setEndereco] = useState();
  const [openModal, setOpenModal] = useState(null);
  const [users, setUsers] = useState([{}]);
  const handleOpen = () =>{ setOpenModal(true);console.log('paciente',paciente) }   // Função para abrir o modal
  const handleClose = () => setOpenModal(false); // Função para fechar o modal
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  useEffect(() => {
    fetchData();
  }, []);



const fetchData = async () => {
  const pacientesAPI = await EnderecoService.getByIDPaciente(id)
  
  setEndereco(pacientesAPI);
};

    const parentToChild = (dataFormulario,isEdit) => {
 if (isEdit) {
    // Atualizar paciente
    PacienteService.update(dataFormulario)
      .then(() => {
        // Atualiza a lista de usuários com os novos dados do paciente atualizado
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === dataFormulario.id ? dataFormulario : user
          )
        );
        console.log('Paciente atualizado com sucesso!');
      })
      .catch((error) => {
        console.error('Erro ao atualizar o paciente:', error);
      });
  } else {
    // Inserir novo paciente
    PacienteService.insertData(dataFormulario)
      .then((newPaciente) => {
        setUsers((prevUsers) => [...prevUsers, newPaciente]);
        console.log('Novo paciente adicionado com sucesso!');
      })
      .catch((error) => {
        console.error('Erro ao adicionar o paciente:', error);
      });
  }
  }

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const deleteRow = () => {
    PacienteService.deleteByID(id);
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{paciente.telefone}</TableCell>

        <TableCell>{email}</TableCell>

        <TableCell>
          <Label color={status ? 'success' : 'error'}>{status}</Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleOpen}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={deleteRow} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
      <ModalPaciente open = {openModal} handleClose={handleClose} parentToChild={parentToChild} paciente={paciente} endereco={endereco} isEdit />
    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  id: PropTypes.any,
  company: PropTypes.any,
  handleClick: PropTypes.func,
  email: PropTypes.any,
  name: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
  paciente: PropTypes.any
};
