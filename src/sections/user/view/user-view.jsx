import { useState } from 'react';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'; // Importação do TextField
import FormControl from '@mui/material/FormControl'; // Importação do FormControl
import InputLabel from '@mui/material/InputLabel'; // Importação do InputLabel
import Select from '@mui/material/Select'; // Importação do Select
import MenuItem from '@mui/material/MenuItem'; // Importação do MenuItem
import InputMask from 'react-input-mask'; // Importação do InputMask

import { users } from 'src/_mock/user';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// Definindo o estilo do modal
const style = {
  position: 'absolute',
  top: '2%',
  left: '50%',
  transform: 'translate(-50%, 0%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 2,
  p: 4,
  borderRadius: 2,
};

export default function UserPage() {
  const [open, setOpen] = useState(false);  // Estado para controle do modal
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpen = () => setOpen(true);   // Função para abrir o modal
  const handleClose = () => setOpen(false); // Função para fechar o modal

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Pacientes</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpen}>
          Adicionar Novo Paciente
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Nome' },
                  { id: 'company', label: 'Company' },
                  { id: 'role', label: 'Role' },
                  { id: 'isVerified', label: 'Débito', align: 'center' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      name={row.name}
                      role={row.role}
                      status={row.status}
                      company={row.company}
                      avatarUrl={row.avatarUrl}
                      isVerified={row.isVerified}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Adicionar Novo Paciente
          </Typography>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Nome Completo"
              variant="outlined"
              required
            />
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel htmlFor="cpf">.</InputLabel>
                <InputMask mask="999.999.999-99" maskPlaceholder={null}>
                  {(inputProps) => (
                    <TextField
                      {...inputProps}
                      id="cpf"
                      variant="outlined"
                      label="CPF"
                      placeholder="CPF"
                      required
                      InputLabelProps={{ shrink: true }} // Isso garante que o rótulo se mova para cima quando o campo está em uso
                    />
                  )}
                </InputMask>
              </FormControl>
              <TextField
                fullWidth
                margin="normal"
                label="Data de Nascimento"
                type="date"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                required
              />
            </Stack>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <FormControl fullWidth margin="normal" variant="outlined" required>
                <InputLabel>Sexo</InputLabel>
                <Select
                  label="Sexo"
                  defaultValue=""
                  required
                  displayEmpty
                >
                  <MenuItem value="male">Masculino</MenuItem>
                  <MenuItem value="female">Feminino</MenuItem>
                  <MenuItem value="other">Outro</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal" variant="outlined" required>
                <InputLabel>Estado Civil</InputLabel>
                <Select
                  label="Estado Civil"
                  defaultValue=""
                  required
                  displayEmpty
                >
                  <MenuItem value="solteiro">Solteiro</MenuItem>
                  <MenuItem value="casado">Casado</MenuItem>
                  <MenuItem value="divorciado">Divorciado</MenuItem>
                  <MenuItem value="viuvo">Viúvo</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <TextField
              fullWidth
              margin="normal"
              label="E-mail"
              variant="outlined"
              required
              sx={{ mt: 2 }}
            />
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <FormControl fullWidth margin="normal" variant="outlined">
                <InputLabel htmlFor="cep">.</InputLabel>
                <InputMask mask="99999-999" maskPlaceholder={null}>
                  {(inputProps) => (
                    <TextField
                      {...inputProps}
                      id="cep"
                      variant="outlined"
                      label="CEP"
                      placeholder="CEP"
                      required
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                </InputMask>
              </FormControl>
              <TextField
                fullWidth
                margin="normal"
                label="Endereço"
                variant="outlined"
                required
              />
            </Stack>
            {/* Campos Bairro e Número abaixo de CEP e Endereço */}
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                margin="normal"
                label="Bairro"
                variant="outlined"
                required
              />
              <TextField
                fullWidth
                margin="normal"
                label="Número"
                variant="outlined"
                required
                type="number" // Garante que somente números podem ser inseridos
              />
            </Stack>
            <TextField
              fullWidth
              margin="normal"
              label="Local de Atendimento"
              variant="outlined"
              required
              sx={{ mt: 2 }}
            />
            {/* Botão Salvar */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                sx={{ backgroundColor: '#B0E0E6', color: '#000', '&:hover': { backgroundColor: '#ADD8E6' } }}
                onClick={() => {
                  handleClose(); // Fecha o modal
                }}
              >
                Salvar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}
