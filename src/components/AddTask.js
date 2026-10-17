import React, { useState } from 'react';
import Button from './Button';
import TextInput from './TextInput';
import CategorySelect from './CategorySelect';
import { RECURRENCE } from '../utils/recurrence';
import { PRIORITY_OPTIONS, DEFAULT_PRIORITY } from '../utils/priority';

import imageMais from '../assets/plus.png';

export default function AddTask(props) {
  const { onAdd } = props;

  const [taskTitle, setTaskTitle] = useState('');
  const [category, setCategory] = useState('Personal');
  const [recurrence, setRecurrence] = useState(RECURRENCE.NONE);
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [priority, setPriority] = useState(DEFAULT_PRIORITY);


const MAX_CHARS=500;const handleAdd=()=>{if(!taskTitle.trim())return;if(description.trim()&&description.length>MAX_CHARS)return;const newTask=title:taskTitle,category,checked:false,recurrence,dueDate,tags:tags||[],description,priority,};onAdd(newTask);set