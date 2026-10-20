export function toLocalDateString(d){const y=d.getFullYear();const m=String(d.getMonth()+1).padStart(2,'0');const dd=String(d.getDate()).padStart(2,'0');return y+'-'+m+'-'+dd;}

export function isToday(x){return !!x&&x===toLocalDateString(new Date());}

export function isThisWeek(x){if(!x)return false;const t=new Date();const s=new Date();s.setDate(t.getDate()+7);return x>=toLocalDateString(t)&&x<=toLocalDateString(s);}