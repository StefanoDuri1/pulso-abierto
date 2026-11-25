import { afterEach, afterAll, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import PaginaInicio from '../paginas/PaginaInicio';
import * as servicio from '../servicios/precios';

afterEach(() => {
  cleanup();
});

describe('Consulta de precios', () => {
  afterEach(() => vi.restoreAllMocks());
  it('muestra resultados después de consultar', async () => {
    vi.spyOn(servicio, 'obtenerPrecios').mockResolvedValue([{ id: 'bitcoin', nombre: 'Bitcoin', simbolo: 'BTC', precio: 100 }]);
    const usuario = userEvent.setup();
    render(<MemoryRouter><PaginaInicio /></MemoryRouter>);
    await usuario.click(screen.getByRole('button', { name: 'Consultar precios' }));
    expect(await screen.findByText(/Se encontraron 1 criptomonedas/)).toBeInTheDocument();
  });
  it('muestra el error y permite reintentar', async () => {
    vi.spyOn(servicio, 'obtenerPrecios').mockRejectedValue(new Error('Sin conexión'));
    const usuario = userEvent.setup();
    render(<MemoryRouter><PaginaInicio /></MemoryRouter>);
    await usuario.click(screen.getByRole('button', { name: 'Consultar precios' }));
    expect(await screen.findByRole('button', { name: 'Volver a intentar' })).toBeInTheDocument();
  });
});
