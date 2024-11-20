import React, { useState } from "react";
import "./relatorio.css";

const Relatorio = () => {
  const [activeTab, setActiveTab] = useState("Anamneses");
  const [paciente, setPaciente] = useState("");
  const [data, setData] = useState("");
  const [informacoes, setInformacoes] = useState("");

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
    link.download = `${activeTab}_relatorio.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      <div className="menu-lateral">
        <ul>
          {["Anamneses", "Planos alimentares"].map((tab) => (
            <li
              key={tab}
              className={activeTab === tab ? "ativo" : ""}
              onClick={() => setActiveTab(tab)}
              onKeyDown={(e) => e.key === "Enter" && setActiveTab(tab)}
              role="button"
              tabIndex={0}
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>
      <div className="conteudo">
        <h2>{activeTab}</h2>
        <div className="campo">
          <label htmlFor="paciente">Vincular Paciente</label>
          <select
            id="paciente"
            value={paciente}
            onChange={(e) => setPaciente(e.target.value)}
          >
            <option value="">Selecione um paciente</option>
            <option value="Paciente">Paciente 1</option>
          </select>
        </div>
        <div className="campo">
          <label htmlFor="data">Data</label>
          <input
            id="data"
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="informacoes">Informações</label>
          <textarea
            id="informacoes"
            value={informacoes}
            onChange={(e) => setInformacoes(e.target.value)}
          />
        </div>
        <button
          type="button"
          onClick={handleDownloadPDF}
          className="botao-download"
        >
          Baixar Relatório em PDF
        </button>
      </div>
    </div>
  );
};

export default Relatorio;
