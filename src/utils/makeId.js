var idCounter=0;
function makeId(){
if(typeof crypto!=='undefined'&&typeof crypto.randomUUID==='function'){return crypto.randomUUID();}
idCounter+=1;
return Date.now()+'-'+Math.random().toString(36).slice(2)+'-'+idCounter;
}
export default makeId;
