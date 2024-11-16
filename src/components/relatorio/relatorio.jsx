import { useState } from "react";

const Relatorio = () => {
  const [activeTab, setActiveTab] = useState("form");

  const handleSubmitPlano = (event) => {
    event.preventDefault();
    alert("Plano Alimentar enviado com sucesso!");
  };

  const handleSubmitAnamnese = (event) => {
    event.preventDefault();
    alert("Anamnese enviada com sucesso!");
  };

  return (
    <div className="container mx-auto p-4">
      {/* Controle de abas */}
      <div className="flex justify-center space-x-4 mb-4">
        <button
          type="button"
          onClick={() => setActiveTab("form")}
          className={`px-4 py-2 border ${activeTab === "form" ? "bg-gray-300" : ""}`}
        >
          Formulário
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("relatorio")}
          className={`px-4 py-2 border ${activeTab === "relatorio" ? "bg-gray-300" : ""}`}
        >
          Relatório
        </button>
      </div>

      {/* Conteúdo das abas */}
      {activeTab === "form" && (
        <form onSubmit={handleSubmitPlano}>
          <h2 className="text-xl font-bold mb-4">Plano Alimentar</h2>

          <div className="mb-4">
            <label htmlFor="refeicao" className="block mb-1">
              Refeição
              <input
                id="refeicao"
                name="refeicao"
                type="text"
                className="w-full border px-2 py-1"
                required
              />
            </label>
          </div>

          <div className="mb-4">
            <label htmlFor="alimentos" className="block mb-1">
              Alimentos e Porções
              <input
                id="alimentos"
                name="alimentos"
                type="text"
                className="w-full border px-2 py-1"
                required
              />
            </label>
          </div>

          <div className="mb-4">
            <label htmlFor="horario" className="block mb-1">
              Horário
              <input
                id="horario"
                name="horario"
                type="time"
                className="w-full border px-2 py-1"
                required
              />
            </label>
          </div>

          <button type="submit" className="px-4 py-2 bg-blue-500 text-white">
            Enviar Plano Alimentar
          </button>
        </form>
      )}

      {activeTab === "relatorio" && (
        <form onSubmit={handleSubmitAnamnese}>
          <h2 className="text-xl font-bold mb-4">Anamnese</h2>

          <div className="mb-4">
            <label htmlFor="peso" className="block mb-1">
              Peso
              <input
                id="peso"
                name="peso"
                type="text"
                className="w-full border px-2 py-1"
                required
              />
            </label>
          </div>

          <div className="mb-4">
            <label htmlFor="altura" className="block mb-1">
              Altura
              <input
                id="altura"
                name="altura"
                type="text"
                className="w-full border px-2 py-1"
                required
              />
            </label>
          </div>

          <div className="mb-4">
            <label htmlFor="restricoes" className="block mb-1">
              Restrições Alimentares
              <input
                id="restricoes"
                name="restricoes"
                type="text"
                className="w-full border px-2 py-1"
              />
            </label>
          </div>

          <div className="mb-4">
            <label htmlFor="doencas" className="block mb-1">
              Doenças Pré-existentes
              <input
                id="doencas"
                name="doencas"
                type="text"
                className="w-full border px-2 py-1"
              />
            </label>
          </div>

          <div className="mb-4">
            <label htmlFor="objetivo" className="block mb-1">
              Objetivo
              <input
                id="objetivo"
                name="objetivo"
                type="text"
                className="w-full border px-2 py-1"
                required
              />
            </label>
          </div>

          <button type="submit" className="px-4 py-2 bg-green-500 text-white">
            Enviar Anamnese
          </button>
        </form>
      )}
    </div>
  );
};

export default Relatorio;
