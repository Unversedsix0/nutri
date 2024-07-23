/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'

import FormControl from '@mui/material/FormControl'; // Importação do FormControl
import InputLabel from '@mui/material/InputLabel'; // Importação do InputLabel
import Select from '@mui/material/Select'; // Importação do Select
import MenuItem from '@mui/material/MenuItem'; // Importação do MenuItem
import InputMask from 'react-input-mask'; // Importação do InputMask

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

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

export default function ModalPaciente(props) {
  const {open, handleClose} = props;
  return (
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
                <InputLabel htmlFor="cpf" />
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
                <InputLabel htmlFor="cep" />
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
                    handleClose()
                
                }}
              >
                Salvar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
  )
}
