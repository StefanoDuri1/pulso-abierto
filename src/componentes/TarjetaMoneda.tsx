import { Link } from 'react-router-dom';
import { usarFavoritos } from '../estado/favoritos';
import type { Moneda } from '../tipos/monedas';
import { formatearPrecio } from '../utilidades/formatoPrecio';
type Propiedades = { moneda: Moneda };
export default function TarjetaMoneda({ moneda }: Propiedades) {
  const favorita = usarFavoritos(estado => estado.favoritos.includes(moneda.id));
  const alternarFavorito = usarFavoritos(estado => estado.alternarFavorito);
  return <li><article className="coin-card">
    <div className="coin-card__header"><h3>{moneda.nombre}</h3><span className="coin-card__symbol">{moneda.simbolo}</span></div>
    <p>Precio actual (USD)</p><p className="coin-card__price">{formatearPrecio(moneda.precio)}</p>
    <div className="acciones-tarjeta">
      <Link to={`/criptomonedas/${moneda.id}`}>Ver detalle</Link>
      <button type="button" className="boton-favorito" onClick={() => alternarFavorito(moneda.id)} aria-pressed={favorita}>{favorita ? '★ Favorita' : '☆ Marcar favorita'}</button>
    </div>
  </article></li>;
}
