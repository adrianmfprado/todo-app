import React,{useEffect,useRef}from'react';

export const UNDO_DURATION_MS=5000;

export default function Snackbar({message,actionLabel,onAction,onExpire,durationMs}){
const duration=(typeof durationMs==='number'&&durationMs>0)?durationMs:UNDO_DURATION_MS;
const onExpireRef=useRef(onExpire);
onExpireRef.current=onExpire;

useEffect(()=>{
if(!message)return undefined;
const timer=setTimeout(()=>{
if(typeof onExpireRef.current==='function')onExpireRef.current();
},duration);
return()=>clearTimeout(timer);
},[message,duration]);

if(!message)return null;

return(
<div className="undo-snackbar" role="status" aria-live="polite">
<span className="undo-snackbar-message">{message}</span>
{onAction&&(
<button type="button" className="undo-snackbar-action"
onClick={()=>{if(typeof onAction==='function')onAction();}}>
{actionLabel||'Desfazer'}
</button>
)}
</div>
);
}