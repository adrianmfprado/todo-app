import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditTaskModal from '../EditTaskModal';

describe('EditTaskModal', () => {
  const task = { id: 1, title: 'Test', checked: false, priority: 'Medium' };
  const onSave = jest.fn();
  const onClose = jest.fn();

  test('renders modal with pre-filled data', () => {
    render(<EditTaskModal task={task} onSave={onSave} onClose={onClose} />);
    expect(screen.getByDisplayValue('Test')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Medium')).toBeInTheDocument();
  });

  test('updates task on save', () => {
    render(<EditTaskModal task={task} onSave={onSave} onClose={onClose} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Updated' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'High' } });
    fireEvent.click(screen.getByText('Save'));
    expect(onSave).toHaveBeenCalledWith({ ...task, title: 'Updated', priority: 'High' });
    expect(onClose).toHaveBeenCalled();
  });
});