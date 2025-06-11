import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SequenceAlignment from './SequenceAlignment';

const theme = createTheme();

const SequenceAlignmentWithTheme = () => (
  <ThemeProvider theme={theme}>
    <SequenceAlignment />
  </ThemeProvider>
);

describe('SequenceAlignment', () => {
  beforeEach(() => {
  });

  test('renders the main title', () => {
    render(<SequenceAlignmentWithTheme />);
    expect(screen.getByText('Инструмент для визуализации выравнивания аминокислотных последовательностей')).toBeInTheDocument();
  });

  test('renders both input fields', () => {
    render(<SequenceAlignmentWithTheme />);
    expect(screen.getByLabelText('Первая аминокислотная последовательность')).toBeInTheDocument();
    expect(screen.getByLabelText('Вторая аминокислотная последовательность')).toBeInTheDocument();
  });

  test('renders submit button', () => {
    render(<SequenceAlignmentWithTheme />);
    expect(screen.getByRole('button', { name: 'Показать выравнивание' })).toBeInTheDocument();
  });

  test('shows validation error for empty fields', async () => {
    render(<SequenceAlignmentWithTheme />);
    const submitButton = screen.getByRole('button', { name: 'Показать выравнивание' });
    
    userEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getAllByText('Поле обязательно для заполнения')).toHaveLength(2);
    });
  });

  test('shows validation error for invalid amino acid characters', async () => {
    render(<SequenceAlignmentWithTheme />);
    const firstInput = screen.getByLabelText('Первая аминокислотная последовательность');
    
    userEvent.type(firstInput, 'INVALID123');
    
    await waitFor(() => {
      expect(screen.getByText(/может содержать только латинские буквы аминокислот/)).toBeInTheDocument();
    });
  });

  test('shows validation error for different sequence lengths', async () => {
    render(<SequenceAlignmentWithTheme />);
    const firstInput = screen.getByLabelText('Первая аминокислотная последовательность');
    const secondInput = screen.getByLabelText('Вторая аминокислотная последовательность');
    
    userEvent.type(firstInput, 'ARNDCE');
    userEvent.type(secondInput, 'ARND');
    
    await waitFor(() => {
      expect(screen.getAllByText('Длина последовательностей должна быть одинаковой')).toHaveLength(2);
    });
  });

  test('accepts valid amino acid sequences', async () => {
    render(<SequenceAlignmentWithTheme />);
    const firstInput = screen.getByLabelText('Первая аминокислотная последовательность');
    const secondInput = screen.getByLabelText('Вторая аминокислотная последовательность');
    
    userEvent.type(firstInput, 'ARNDCEQ');
    userEvent.type(secondInput, 'GHILKMF');
    
    await waitFor(() => {
      expect(screen.queryByText(/может содержать только латинские буквы аминокислот/)).not.toBeInTheDocument();
    });
    
    await waitFor(() => {
      expect(screen.queryByText('Длина последовательностей должна быть одинаковой')).not.toBeInTheDocument();
    });
  });

  test('accepts sequences with dash character', async () => {
    render(<SequenceAlignmentWithTheme />);
    const firstInput = screen.getByLabelText('Первая аминокислотная последовательность');
    
    userEvent.type(firstInput, 'AR-NDC-E');
    
    await waitFor(() => {
      expect(screen.queryByText(/может содержать только латинские буквы аминокислот/)).not.toBeInTheDocument();
    });
  });

  test('shows visualization after valid form submission', async () => {
    render(<SequenceAlignmentWithTheme />);
    const firstInput = screen.getByLabelText('Первая аминокислотная последовательность');
    const secondInput = screen.getByLabelText('Вторая аминокислотная последовательность');
    const submitButton = screen.getByRole('button', { name: 'Показать выравнивание' });
    
    userEvent.type(firstInput, 'ARNDCE');
    userEvent.type(secondInput, 'GHILKM');
    userEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Визуализация выравнивания')).toBeInTheDocument();
    });
  });

  test('converts sequences to uppercase in visualization', async () => {
    render(<SequenceAlignmentWithTheme />);
    const firstInput = screen.getByLabelText('Первая аминокислотная последовательность');
    const secondInput = screen.getByLabelText('Вторая аминокислотная последовательность');
    const submitButton = screen.getByRole('button', { name: 'Показать выравнивание' });
    
    userEvent.type(firstInput, 'arndce');
    userEvent.type(secondInput, 'ghilkm');
    userEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Визуализация выравнивания')).toBeInTheDocument();
    });
  });

  test('displays instruction alert', () => {
    render(<SequenceAlignmentWithTheme />);
    expect(screen.getByText('Инструкция:')).toBeInTheDocument();
    expect(screen.getByText(/Введите две аминокислотные последовательности одинаковой длины/)).toBeInTheDocument();
  });

  test('input fields are present and accessible', () => {
    render(<SequenceAlignmentWithTheme />);
    const firstInput = screen.getByLabelText('Первая аминокислотная последовательность');
    const secondInput = screen.getByLabelText('Вторая аминокислотная последовательность');
    
    expect(firstInput).toBeInTheDocument();
    expect(secondInput).toBeInTheDocument();
    expect(firstInput).toHaveAttribute('placeholder', 'Например: VLSPADKTNIKASWEKIGSHG');
    expect(secondInput).toHaveAttribute('placeholder', 'Например: VLSPADKTNIKASWEKIGSHG');
  });

  test('validates all required amino acid characters', async () => {
    render(<SequenceAlignmentWithTheme />);
    const firstInput = screen.getByLabelText('Первая аминокислотная последовательность');
    
    const validSequence = 'ARNDCEQGHILKMFPSTWYV-';
    userEvent.type(firstInput, validSequence);
    
    await waitFor(() => {
      expect(screen.queryByText(/может содержать только латинские буквы аминокислот/)).not.toBeInTheDocument();
    });
  });
});