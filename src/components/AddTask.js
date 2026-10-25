import React,{useState} from 'react';
import Button from './Button';
import TextInput from './TextInput';
import CategorySelect from './CategorySelect';
import {RECURRENCE} from '../utils/recurrence';
import {PRIORITY_LABELS,DEFAULT_PRIORITY} from '../utils/priority';

import imageMais from '../assets/plus.png';

export default function AddTask(props){
const{onAdd}=props;
const[taskTitle,setTaskTitle]=useState('');
const[category,setCategory]=useState('Personal');
const[recurrence,setRecurrence]=useState(RECURRENCE.NONE);
const[dueDate,setDueDate]=useState('');
const[tags,setTags]=useState([]);
const[description setDescription setDescription setDescription setDescription setDescription setDescription setDescription setDescription setDescription setDescription setDescription setDescription setDescription setDescription setDescription setDescription setDescription setDescription setDescription setDescription.setDescription.setDescription.setDescription.setDescription.setDescription.setDescription.setDescription.setDescription.setDescription.setDescription.setDescription.setDescription.setDescription.setDescription.setDescription.setDescription.setDescription.setDescription.setDescription.setDescription