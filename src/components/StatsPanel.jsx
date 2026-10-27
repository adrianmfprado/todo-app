// Painel de estatisticas da home - spec em docs/specs/stats-panel-sdd.md.
// Forma escolhida (documentada): render PURO - HomePage calcula
// computeStats(taskList) e passa o resultado via prop `stats`.
// Reflete mudancas da taskList automaticamente a cada render da HomePage.
function StatsPanel({ stats }){
  var s = stats || { total: 0, pending: 0, completed: 0, overdue: 0 };
  return (
    <section className='stats-panel' role='status' aria-live='polite' aria-label='Resumo das tarefas'>
      <div className='stats-panel-item stats-total'>
        <span className='stats-panel-label'>Total</span>
        <span className='stats-panel-value'>{s.total}</span>
      </div>
      <div className='stats-panel-item stats-pending'>
        <span className='stats-panel-label'>Pendentes</span>
        <span className='stats-panel-value'>{s.pending}</span>
      </div>
      <div className='stats-panel-item stats-completed'>
        <span className='stats-panel-label'>Concluidas</span>
        <span className='stats-panel-value'>{s.completed}</span>
      </div>
      <div className='stats-panel-item stats-overdue'>
        <span className='stats-panel-label'>Atrasadas</span>
        <span className='stats-panel-value'>{s.overdue}</span>
      </div>
    </section>
  );
}

export default StatsPanel;
