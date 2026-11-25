export type IdMoneda = 'bitcoin' | 'ethereum' | 'solana';
export type ModoPrueba = 'real' | 'demora' | 'vacio' | 'error';
export type EstadoConsulta = 'inicial' | 'carga' | 'resultado' | 'vacio' | 'error';
export interface Moneda { id: IdMoneda; nombre: string; simbolo: string; precio: number }
export const monedasDisponibles: { id: IdMoneda; nombre: string; simbolo: string }[] = [
  { id: 'bitcoin', nombre: 'Bitcoin', simbolo: 'BTC' },
  { id: 'ethereum', nombre: 'Ethereum', simbolo: 'ETH' },
  { id: 'solana', nombre: 'Solana', simbolo: 'SOL' },
];
export function esMoneda(id: string | undefined): id is IdMoneda {
  return monedasDisponibles.some(moneda => moneda.id === id);
}
