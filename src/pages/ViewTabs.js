export default function ViewTabs({view,setView}){
return(
<div className="view-filter" role="tablist" aria-label="Filtro de visualização">
<button type="button" role="tab" aria-selected={view==='all'}
className={view==='all'?'view-filter-btn active':'view-filter-btn'}
onClick={()=>setView('all')}>Todas</button>
<button type="button" role="tab" aria-selected={view==='today'}
className={view==='today'?'view-filter-btn active':'view-filter-btn'}
onClick={()=>setView('today')}>Hoje</button>
<button type="button" role="tab" aria-selected={view==='week'}
className={view==='week'?'view-filter-btn active':'view-filter-btn'}
onClick={()=>setView('week')}>Esta semana</button>
</div>
);
}