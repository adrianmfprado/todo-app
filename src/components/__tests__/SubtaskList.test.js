import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SubtaskList from '../SubtaskList';

describe('SubtaskList', () => {
  const subtasks = [
    { id: 1, text: 'Buy milk', done: true },
    { id: 2, text: 'Buy bread', done: false },
    { id: 3, text: 'Buy eggs', done: false },
  ];

  it('renders progress label with done/total count', () => {
    render(
      <SubtaskList
        subtasks={subtasks}
        onToggle={() => {}}
        onAdd={() => {}}
        onRemove={() => {}}
      />
    );
    expect(screen.getByText('1/3 done')).toBeInTheDocument();
  });

  it('renders all subtasks', () => {
    render(
      <SubtaskList
        subtasks={subtasks}
        onToggle={() => {}}
        onAdd={() => {}}
        onRemove={() => {}}
      />
    );
    expect(screen.getByText('Buy milk')).toBeInTheDocument();
    expect(screen.getByText('Buy bread')).toBeInTheDocument();
    expect(screen.getByText('Buy eggs')).toBeInTheDocument();
  });

  it('calls onToggle when a checkbox is clicked', () => {
    const onToggle = jest.fn();
    render(
      <SubtaskList
        subtasks={subtasks}
        onToggle={onToggle}
        onAdd={() => {}}
        onRemove={() => {}}
      />
    );
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[1]);
    expect(onToggle).toHaveBeenCalledWith(2);
  });

  it('calls onAdd with the input text when form is submitted', () => {
    const onAdd = jest.fn();
    render(
      <SubtaskList
        subtasks={subtasks}
        onToggle={() => {}}
        onAdd={onAdd}
        onRemove={() => {}}
      />
    );
    const input = screen.getByPlaceholderText('Add a subtask...');
    fireEvent.change(input, { target: { value: 'New subtask' } });
    fireEvent.click(screen.getByText('Add'));
    expect(onAdd).toHaveBeenCalledWith('New subtask');
  });

  it('calls onRemove when remove button is clicked', () => {
    const onRemove = jest.fn();
    render(
      <SubtaskList
        subtasks={subtasks}
        onToggle={() => {}}
        onAdd={() => {}}
        onRemove={onRemove}
      />
    );
    const removeButtons = screen.getAllByLabelText('Remove subtask');
    fireEvent.click(removeButtons[0]);
    expect(onRemove).toHaveBeenCalledWith(1);
  });

  it('shows 0/0 done when there are no subtasks', () => {
    render(
      <SubtaskList
        subtasks={[]}
        onToggle={() => {}}
        onAdd={() => {}}
        onRemove={() => {}}
      />
    );
    expect(screen.getByText('0/0 done')).toBeInTheDocument();
  });
});
