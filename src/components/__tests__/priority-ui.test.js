import React from 'react';
import { render } from '@testing-library/react';
import TaskItem from '../TaskItem';

test('badge alta visivel',()=>{
render(<TaskItem item={{id:'1',title:'T',priority:'alta'}} onCheck={()=>{}} onRemove={()=>{}}/>);
expect(document.querySelector('.task-priority-alta')).not.toBeNull();
});
