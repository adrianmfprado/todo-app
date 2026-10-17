import { PRIORITY,
 DEFAULT_PRIORITY,
 PRIORITY_LABELS,
 PRIORITY_WEIGHT,
 isValidPriority,
 getPriorityLabel } from '../priority';

test('constantes e pesos',()=>{
 expect(PRIORITY).toEqual({ALTA:'alta',MEDIA:'media',BAIXA:'baixa'});
 expect(DEFAULT_PRIORITY).toBe('media');
 expect(PRIORITY_WEIGHT.alta).toBeLessThan(PRIORITY_WEIGHT.media);
});

test('validacao e rotulos',()=>{
 ['alta','media','baixa'].forEach(p=>expect(isValidPriority(p)).toBe(true));
 [undefined,null,'','x'].forEach(p=>expect(isValidPriority(p)).toBe(false));
 expect(getPriorityLabel('alta')).toBe('Alta');
 expect(getPriorityLabel('x')).toBe('');
});