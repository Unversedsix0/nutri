import { useState } from "react";
import InputMask from "react-input-mask";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import { alpha, useTheme } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";

import { useRouter } from "src/routes/hooks";
import { bgGradient } from "src/theme/css";

import Logo from "src/components/logo";
import Iconify from "src/components/iconify";

export default function RegisterView() {
  const theme = useTheme();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    cnpj: "",
    telefone: "",
    email: "",
    usuario: "",
    senha: "",
    cep: "",
    logradouro: "",
    numero: "",
    cidade: "",
    uf: "",
    complemento: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClick = () => {
    console.log("Form Data:", formData);
    router.push("/login");
  };

  const renderForm = (
    <Stack direction="row" spacing={3} alignItems="flex-start">
      {/* Seção 1: Dados do Usuário */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Dados do Usuário
        </Typography>

        <Stack spacing={2}>
          <TextField
            name="nome"
            label="Nome"
            value={formData.nome}
            onChange={handleInputChange}
          />

          {/* Campo de CNPJ com máscara */}
          <InputMask
            mask="99.999.999/9999-99"
            value={formData.cnpj}
            onChange={(e) => handleInputChange(e)}
          >
            {(inputProps) => (
              <TextField
                {...inputProps}
                name="cnpj"
                label="CNPJ"
                placeholder="00.000.000/0001-00"
              />
            )}
          </InputMask>

          <TextField
            name="telefone"
            label="Telefone"
            value={formData.telefone}
            onChange={handleInputChange}
          />

          <TextField
            name="email"
            label="E-mail"
            value={formData.email}
            onChange={handleInputChange}
          />

          <TextField
            name="usuario"
            label="Usuário"
            value={formData.usuario}
            onChange={handleInputChange}
          />

          <TextField
            name="senha"
            label="Senha"
            type={showPassword ? "text" : "password"}
            value={formData.senha}
            onChange={handleInputChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Box>

      <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

      {/* Seção 2: Endereço */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Endereço
        </Typography>

        <Stack spacing={2}>
          <InputMask
            mask="99999-999"
            value={formData.cep}
            onChange={(e) => handleInputChange(e)}
          >
            {(inputProps) => (
              <TextField
                {...inputProps}
                name="cep"
                label="CEP"
                placeholder="00000-000"
              />
            )}
          </InputMask>

          <TextField
            name="logradouro"
            label="Logradouro"
            value={formData.logradouro}
            onChange={handleInputChange}
          />

          <TextField
            name="numero"
            label="Número"
            value={formData.numero}
            onChange={handleInputChange}
          />

          <TextField
            name="cidade"
            label="Cidade"
            value={formData.cidade}
            onChange={handleInputChange}
          />

          <TextField
            name="uf"
            label="UF"
            value={formData.uf}
            onChange={handleInputChange}
          />

          <TextField
            name="complemento"
            label="Complemento"
            value={formData.complemento}
            onChange={handleInputChange}
          />
        </Stack>
      </Box>
    </Stack>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: "/assets/background/overlay_4.jpg",
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: "fixed",
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 840, // Ajuste a largura total do formulário
          }}
        >
          <Typography variant="h4">Crie a sua conta</Typography>

          <Divider sx={{ my: 3 }} />

          {renderForm}

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="inherit"
            onClick={handleClick}
            sx={{ mt: 3 }}
          >
            Criar Conta
          </LoadingButton>
        </Card>
      </Stack>
    </Box>
  );
}
