import AddTask from '../components/AddTask';
import TaskList from '../components/TaskList';
import Snackbar from '../components/SnackBar';

// Secao central da HomePage criacao lista e snackbar de desfazer.
export default function TaskSection(p){
return(
<div>
<AddTask onCreate={(t)=>p.onCreate(t)}/>
<TaskList dataSource={(typeof p.tasks==='undefined')?[]:(typeof p.tasks.length==='number'?Array.prototype.slice.call(p.tasks):[])} emptyMessage={'Nao ha tarefas'} />
</div>
);
}

// Fim provisorio - versao completa no proximo commit