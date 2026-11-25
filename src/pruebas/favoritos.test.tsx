import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import TarjetaMoneda from '../componentes/TarjetaMoneda';
import { usarFavoritos } from '../estado/favoritos';

describe('Favoritos', () => {
  beforeEach(() => usarFavoritos.setState({ favoritos: [] }));
  it('permite marcar y desmarcar una moneda', async () => {
    const usuario = userEvent.setup();
    render(<MemoryRouter><TarjetaMoneda moneda={{ id: 'bitcoin', nombre: 'Bitcoin', simbolo: 'BTC', precio: 100 }} /></MemoryRouter>);
    const boton = screen.getByRole('button', { name: /marcar favorita/i });
    await usuario.click(boton);
    expect(screen.getByRole('button', { name: /favorita/i })).toHaveAttribute('aria-pressed', 'true');
    await usuario.click(screen.getByRole('button', { name: /favorita/i }));
    expect(screen.getByRole('button', { name: /marcar favorita/i })).toHaveAttribute('aria-pressed', 'false');
  });
});
