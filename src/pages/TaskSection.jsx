import AddTask from '../components/AddTask';
import TaskList from '../components/TaskList';
import Snackbar from '../components/SnackBar';

// Secao central da HomePage: criacao lista e snackbar de desfazer.
export default function TaskSection(p){
return(
<div>
<AddTask onAdd={p.onCreate}/>
<TaskList dataSource={p.tasks} emptyMessage={p.emptyMessage} onCheck={p.onCheck} onRemove={p.onRemove} onSubtaskToggle={p.onSubToggle} onSubtaskAdd={p.onSubAdd} onSubtaskRemove={p.onSubRem}/>
{p.deletedInfo&&(
<Snackbar key={p.deletedInfo.seq}
message={'Tarefa "'+p.deletedInfo.task.title+'" removida'}
autoHideDurationMs={UNDO_DURATION_MS}
onActionClick={undoDelete}
onExpireAction={()=>{}}/>
)}
</div>
);
}