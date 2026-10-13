import React, { useRef } from "react";
import Button from "./Button";

export default function ExportImportTasks(props) {
  const { tasks, onImport } = props;
  const fileInputRef = useRef(null);

  function handleExport() {
    const dataStr = JSON.stringify(tasks, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "todo-tasks.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function handleImportClick() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  function handleFileChange(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (!Array.isArray(parsed)) {
          alert("Arquivo invalido: o JSON deve conter uma lista de tarefas.");
          return;
        }

        const validTasks = parsed.filter(
          (item) => item && typeof item.title === "string"
        );

        if (validTasks.length === 0) {
          alert("Nenhuma tarefa valida encontrada no arquivo.");
          return;
        }

        onImport(validTasks);
      } catch (error) {
        alert("Erro ao ler o arquivo: JSON invalido.");
      }
    };
    reader.readAsText(file);

    event.target.value = "";
  }

  return (
    <div className="export-import-tasks" role="group" aria-label="Exportar e importar tarefas">
      <Button className="export" text="Exportar JSON" ariaLabel="Exportar tarefas para arquivo JSON" onClick={handleExport} />
      <Button className="import" text="Importar JSON" ariaLabel="Importar tarefas de arquivo JSON" onClick={handleImportClick} />
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json,.json"
        aria-label="Selecionar arquivo JSON de tarefas"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
}
