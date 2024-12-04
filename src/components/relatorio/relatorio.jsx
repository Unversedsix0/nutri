import React, { useState, useEffect } from "react";
import { PacienteService } from "src/service/paciente";
import {
  Box,
  Button,
  Typography,
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Grid,
  Tabs,
  Tab,
} from "@mui/material";

const Relatorio = () => {
  const [activeTab, setActiveTab] = useState("Anamneses");
  const [data, setData] = useState("");
  const [informacoes, setInformacoes] = useState("");
  const [paciente, setPaciente] = useState("");
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const pacientesAPI = await PacienteService.getAll();
    setPacientes(pacientesAPI);
  };

  useEffect(() => {
    console.log("Pacientes:", pacientes);
  }, [pacientes]);

  const handleDownloadPDF = () => {
    const pdfContent = `
      Relatório: ${activeTab}
      Paciente: ${paciente || "Não vinculado"}
      Data: ${data || "Não especificada"}
      Informações:
      ${informacoes || "Nenhuma informação adicionada"}
    `;

    const blob = new Blob([pdfContent], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${paciente}_relatorio.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2}>
        {/* Menu lateral */}
        <Grid item xs={3}>
          <Tabs
            orientation="vertical"
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
          >
            {["Anamneses", "Planos alimentares"].map((tab) => (
              <Tab key={tab} label={tab} value={tab} />
            ))}
          </Tabs>
        </Grid>

        {/* Conteúdo principal */}
        <Grid item xs={9}>
          <Typography variant="h4" gutterBottom>
            {activeTab}
          </Typography>

          {/* Seleção de Paciente */}
          <FormControl fullWidth margin="normal">
            <InputLabel id="paciente-label">Vincular Paciente</InputLabel>
            <Select
              labelId="paciente-label"
              id="paciente"
              value={paciente}
              onChange={(e) => setPaciente(e.target.value)}
            >
              <MenuItem value="">
                <em>Selecione um paciente</em>
              </MenuItem>
              {pacientes.map((paciente) => (
                <MenuItem key={paciente.id} value={paciente.id}>
                  {paciente.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Seleção de Data */}
          <TextField
            id="data"
            label="Data"
            type="date"
            fullWidth
            value={data}
            onChange={(e) => setData(e.target.value)}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          {/* Informações */}
          <TextField
            id="informacoes"
            label="Informações"
            multiline
            fullWidth
            rows={4}
            value={informacoes}
            onChange={(e) => setInformacoes(e.target.value)}
            margin="normal"
          />

          {/* Botão de Download */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleDownloadPDF}
            sx={{ mt: 2 }}
          >
            Baixar Relatório em PDF
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Relatorio;
