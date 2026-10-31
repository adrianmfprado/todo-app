import { render, screen } from '@testing-library/react';
import StatsPanel from '../StatsPanel';

describe('<StatsPanel />', () => {
  it('renderiza os quatro contadores com os valores da prop stats', () => {
    render(<StatsPanel stats={{ total: 10, pending: 4, completed: 5, overdue: 1 }} />);
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('Pendentes')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('Concluidas')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Atrasadas')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('usa zeros quando stats ausente', () => {
    render(<StatsPanel />);
    const values = screen.getAllByText('0');
    expect(values.length).toBe(4);
  });

  it('tem role status e aria-live polite (acessibilidade)', () => {
    render(<StatsPanel stats={{ total: 0, pending: 0, completed: 0, overdue: 0 }} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
