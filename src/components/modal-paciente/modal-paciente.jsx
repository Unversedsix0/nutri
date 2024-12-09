/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-duplicates
import React,{ useState, useEffect  } from 'react';
import InputMask from 'react-input-mask';
import { useForm, Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';

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
  '@media (max-width:600px)': {
    width: '95%',
  },
};

export default function ModalPaciente(props) {
  const { open, handleClose, parentToChild, paciente, isEdit } = props;
  const { control, handleSubmit, formState: { errors }, setValue } = useForm();

  useEffect(() => {
    if (isEdit && paciente) {
      // Carregar os valores do paciente no formulário
      Object.keys(paciente).forEach((key) => {
        setValue(key, paciente[key]);
      });
    }
  }, [isEdit, paciente, setValue]);

  const onSubmit = (data) => {
    console.log('Dados do formulário:', data);
    parentToChild(data);
  };

  

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {isEdit ? 'Editar Paciente' : 'Adicionar Novo Paciente'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
          <Controller
            name="nome"
            control={control}
            defaultValue=""
            rules={{ required: 'Nome completo é obrigatório' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                margin="normal"
                label="Nome Completo"
                variant="outlined"
                error={!!errors.nome}
                helperText={errors.nome ? errors.nome.message : ''}
                required
              />
            )}
          />
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Controller
              name="altura"
              control={control}
              defaultValue=""
              rules={{
                required: 'Altura é obrigatória',
                pattern: {
                  value: /^[0-9]{1}\.[0-9]{2}$/,
                  message: 'Altura deve estar no formato 0.00',
                },
              }}
              render={({ field }) => (
                <FormControl fullWidth margin="normal" variant="outlined">
                  <InputMask mask="9.99" {...field}>
                    {(inputProps) => (
                      <TextField
                        {...inputProps}
                        id="altura"
                        variant="outlined"
                        label="Altura"
                        required
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.altura}
                        helperText={errors.altura ? errors.altura.message : ''}
                      />
                    )}
                  </InputMask>
                </FormControl>
              )}
            />
            <Controller
              name="peso"
              control={control}
              defaultValue=""
              rules={{
                required: 'Peso é obrigatório',
                pattern: {
                  value: /^[0-9]{1,3}\.[0-9]{2}$/,
                  message: 'Peso deve estar no formato 000.00',
                },
              }}
              render={({ field }) => (
                <FormControl fullWidth margin="normal" variant="outlined">
                  <InputMask mask="999.99" {...field}>
                    {(inputProps) => (
                      <TextField
                        {...inputProps}
                        id="peso"
                        variant="outlined"
                        label="Peso"
                        required
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.peso}
                        helperText={errors.peso ? errors.peso.message : ''}
                      />
                    )}
                  </InputMask>
                </FormControl>
              )}
            />
          </Stack>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Controller
              name="cpf"
              control={control}
              defaultValue=""
              rules={{ required: 'CPF é obrigatório' }}
              render={({ field }) => (
                <FormControl fullWidth margin="normal" variant="outlined">
                
                  <InputMask
                    mask="999.999.999-99"
                    {...field}
                  >
                    {(inputProps) => (
                      <TextField
                        {...inputProps}
                        id="cpf"
                        variant="outlined"
                        label="CPF"
                        required
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.cpf}
                        helperText={errors.cpf ? errors.cpf.message : ''}
                      />
                    )}
                  </InputMask>
                </FormControl>
              )}
            />
            <Controller
              name="dataNascimento"
              control={control}
              defaultValue=""
              rules={{ required: 'Data de nascimento é obrigatória' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  margin="normal"
                  label="Data de Nascimento"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  required
                  error={!!errors.dataNascimento}
                  helperText={errors.dataNascimento ? errors.dataNascimento.message : ''}
                />
              )}
            />
          </Stack>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Controller
              name="sexo"
              control={control}
              defaultValue=""
              rules={{ required: 'Sexo é obrigatório' }}
              render={({ field }) => (
                <FormControl fullWidth margin="normal" variant="outlined" required>
                  <InputLabel>Sexo</InputLabel>
                  <Select
                    {...field}
                    label="Sexo"
                    displayEmpty
                    error={!!errors.sexo}
                  >
                
                    <MenuItem value="1">Masculino</MenuItem>
                    <MenuItem value="2">Feminino</MenuItem>
                  </Select>
                  {errors.sexo && <Typography color="error">{errors.sexo.message}</Typography>}
                </FormControl>
              )}
            />
            <Controller
              name="estadoCivil"
              control={control}
              defaultValue=""
              rules={{ required: 'Estado civil é obrigatório' }}
              render={({ field }) => (
                <FormControl fullWidth margin="normal" variant="outlined" required>
                  <InputLabel>Estado Civil</InputLabel>
                  <Select
                    {...field}
                    label="Estado Civil"
                    displayEmpty
                    error={!!errors.estadoCivil}
                  >
                    <MenuItem value="1">Solteiro</MenuItem>
                    <MenuItem value="2">Casado</MenuItem>
                    <MenuItem value="4">Divorciado</MenuItem>
                    <MenuItem value="5">Viúvo</MenuItem>
                  </Select>
                  {errors.estadoCivil && <Typography color="error">{errors.estadoCivil.message}</Typography>}
                </FormControl>
              )}
            />
          </Stack>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: 'E-mail é obrigatório',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'E-mail inválido'
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                margin="normal"
                label="E-mail"
                variant="outlined"
                required
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ''}
                sx={{ mt: 2 }}
              />
            )}
          />
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
  <Controller
    name="telefone"
    control={control}
    defaultValue=""
    rules={{
      required: 'Telefone é obrigatório',
      pattern: {
        value: /^\(\d{2}\) \d{4,5}-\d{4}$/,
        message: 'Telefone deve estar no formato (99) 99999-9999',
      },
    }}
    render={({ field }) => (
      <FormControl fullWidth margin="normal" variant="outlined">
        <InputMask
          mask="(99) 99999-9999"
          {...field}
        >
          {(inputProps) => (
            <TextField
              {...inputProps}
              id="telefone"
              variant="outlined"
              label="Telefone"
              required
              InputLabelProps={{ shrink: true }}
              error={!!errors.telefone}
              helperText={errors.telefone ? errors.telefone.message : ''}
            />
          )}
        </InputMask>
      </FormControl>
    )}
  />
</Stack>

          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Controller
              name="cep"
              control={control}
              defaultValue=""
              rules={{ required: 'CEP é obrigatório' }}
              render={({ field }) => (
                <FormControl fullWidth margin="normal" variant="outlined">
                  <InputMask
                    mask="99999-999"
                    {...field}
                  >
                    {(inputProps) => (
                      <TextField
                        {...inputProps}
                        id="cep"
                        variant="outlined"
                        label="CEP"
                        required
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.cep}
                        helperText={errors.cep ? errors.cep.message : ''}
                      />
                    )}
                  </InputMask>
                </FormControl>
              )}
            />
            <Controller
              name="endereco"
              control={control}
              defaultValue=""
              rules={{ required: 'Endereço é obrigatório' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  margin="normal"
                  label="Endereço"
                  variant="outlined"
                  required
                  error={!!errors.endereco}
                  helperText={errors.endereco ? errors.endereco.message : ''}
                />
              )}
            />
          </Stack>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Controller
              name="cidade"
              control={control}
              defaultValue=""
              rules={{ required: 'Cidade é obrigatório' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  margin="normal"
                  label="Cidade"
                  variant="outlined"
                  required
                  error={!!errors.cidade}
                  helperText={errors.cidade ? errors.cidade.message : ''}
                />
              )}
            />
            <Controller
              name="numero"
              control={control}
              defaultValue=""
              rules={{ required: 'Número é obrigatório' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  margin="normal"
                  label="Número"
                  variant="outlined"
                  required
                  type="number"
                  error={!!errors.numero}
                  helperText={errors.numero ? errors.numero.message : ''}
                />
              )}
            />
          </Stack>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ backgroundColor: '#B0E0E6', color: '#000', '&:hover': { backgroundColor: '#ADD8E6' } }}
            >
              Salvar
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}