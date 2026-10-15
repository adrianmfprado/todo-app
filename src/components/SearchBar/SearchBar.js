import React, { useState } from 'react';

export default function SearchBar({ onFilterChange, initialFilter = 'all' }) {
  const [filter, setFilter] = useState(initialFilter);
  
  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    onFilterChange(value);
  };
  
  return (
    <div className='search-bar' aria-label='Filtro de status de tarefa'>
      <label>
        Filtrar por status:
        <select onChange={handleFilterChange} value={filter}>
          <option value='all' selected={filter === 'all'}>Todos</option>
          <option value='completed' selected={filter === 'completed'}>Concluídas</option>
          <option value='pending' selected={filter === 'pending'}>Pendentes</option>
        </select>
      </label>
    </div>
  );
}
