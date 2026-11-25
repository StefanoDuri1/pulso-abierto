import { monedasDisponibles, type Moneda, type ModoPrueba } from '../tipos/monedas';

const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd';
const esperar = (tiempo: number) => new Promise<void>(resolver => setTimeout(resolver, tiempo));

export async function obtenerPrecios(modo: ModoPrueba = 'real'): Promise<Moneda[]> {
  if (modo === 'demora') await esperar(3000);
  if (modo === 'vacio') { await esperar(500); return []; }
  if (modo === 'error') { await esperar(500); throw new Error('Error de prueba'); }

  const respuesta = await fetch(url);
  if (!respuesta.ok) throw new Error(`Error HTTP ${respuesta.status}`);
  const datos: unknown = await respuesta.json();
  if (!datos || typeof datos !== 'object') throw new Error('La respuesta no tiene el formato esperado');
  const valores = datos as Record<string, unknown>;
  return monedasDisponibles.flatMap(moneda => {
    const dato = valores[moneda.id];
    if (!dato || typeof dato !== 'object') return [];
    const precio = (dato as Record<string, unknown>).usd;
    return typeof precio === 'number' && Number.isFinite(precio) ? [{ ...moneda, precio }] : [];
  });
}
