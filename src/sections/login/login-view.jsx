import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import {api} from 'src/service/api';
import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { Navigate } from 'react-router-dom';
import useAuth from 'src/hooks/useAuth';
import { LoginService } from 'src/service/login';

// ----------------------------------------------------------------------

export default function LoginView() {
    const { setIsLogado, isLogado } = useAuth()
    const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  
  const theme = useTheme();
  
  const router = useRouter();
  
  const [showPassword, setShowPassword] = useState(false);
  
  const handleClick = () => {
  
    const res =  LoginService.signin(formValues.email, formValues.password)
    const userToken = localStorage.getItem("user_token");
    
    if(userToken){
      setIsLogado(true);
      Navigate("/");
    }else{
       setIsLogado(false);
    }

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const loginGoogle = async() => {
    await api.auth.signInWithOAuth({
      provider: "google",
    });
  };
  
  api.auth.onAuthStateChange(async (event) => {
    if (event === "SIGNED_IN") {
      Navigate("/dashboard");
    } else {
      Navigate("/login");
    }
  })

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="E-mail"   onChange={handleChange} />

        <TextField
          name="password"
          label="Senha"
          type={showPassword ? 'text' : 'password'}
            onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        Entrar
      </LoadingButton>
    
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Acesse a sua conta</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Não tem uma conta?
            <Link href="/register" variant="subtitle2" sx={{ ml: 0.5 }} underline="hover">
              Registre-se
            </Link>
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              onClick={loginGoogle}
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Ou
            </Typography>
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
