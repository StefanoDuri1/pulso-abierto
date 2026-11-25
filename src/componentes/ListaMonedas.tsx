import type { Moneda } from '../tipos/monedas';
import TarjetaMoneda from './TarjetaMoneda';
type Propiedades = { monedas: Moneda[] };
export default function ListaMonedas({ monedas }: Propiedades) {
  return <ul className="cards" aria-label="Precios de criptomonedas">{monedas.map(moneda =>
    <TarjetaMoneda key={moneda.id} moneda={moneda} />
  )}</ul>;
}
