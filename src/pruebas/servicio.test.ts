import { afterEach, describe, expect, it, vi } from 'vitest';
import { obtenerPrecios } from '../servicios/precios';

describe('Servicio de precios', () => {
  afterEach(() => vi.unstubAllGlobals());
  it('transforma una respuesta exitosa', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ bitcoin: { usd: 100 }, ethereum: { usd: 50 }, solana: { usd: 10 } }) }));
    const monedas = await obtenerPrecios();
    expect(monedas).toHaveLength(3);
    expect(monedas[0]).toEqual({ id: 'bitcoin', nombre: 'Bitcoin', simbolo: 'BTC', precio: 100 });
  });
  it('informa cuando la respuesta HTTP falla', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 503 }));
    await expect(obtenerPrecios()).rejects.toThrow('Error HTTP 503');
  });
});
