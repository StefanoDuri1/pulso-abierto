import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { esMoneda, monedasDisponibles, type Moneda } from '../tipos/monedas';
import { obtenerPrecios } from '../servicios/precios';
import { usarFavoritos } from '../estado/favoritos';
import { formatearPrecio } from '../utilidades/formatoPrecio';

export default function PaginaDetalle() {
  const { id } = useParams();
  const favoritos = usarFavoritos(estado => estado.favoritos);
  const alternarFavorito = usarFavoritos(estado => estado.alternarFavorito);
  const [moneda, setMoneda] = useState<Moneda | null>(null);
  const [estado, setEstado] = useState<'carga' | 'resultado' | 'vacio' | 'error'>('carga');
  const [intento, setIntento] = useState(0);
  useEffect(() => {
    if (!esMoneda(id)) return;
    let activo = true;
    obtenerPrecios().then(datos => {
      if (!activo) return;
      const encontrada = datos.find(valor => valor.id === id);
      setMoneda(encontrada ?? null);
      setEstado(encontrada ? 'resultado' : 'vacio');
    }).catch(() => { if (activo) setEstado('error'); });
    return () => { activo = false; };
  }, [id, intento]);
  if (!esMoneda(id)) return <main className="container contenido-principal"><section className="panel"><h2>Criptomoneda no encontrada</h2><p>La moneda que buscaste no está disponible.</p><Link to="/">Volver al inicio</Link></section></main>;
  const info = monedasDisponibles.find(valor => valor.id === id);
  if (!info) return null;
  return <main className="container contenido-principal"><section className="panel detalle">
    <Link to="/">← Volver a los resultados</Link><h2>{info.nombre} ({info.simbolo})</h2>
    <button type="button" className="boton-favorito" aria-pressed={favoritos.includes(info.id)} onClick={() => alternarFavorito(info.id)}>{favoritos.includes(info.id) ? '★ Favorita' : '☆ Marcar favorita'}</button>
    {estado === 'carga' && <p role="status">Consultando precio...</p>}
    {estado === 'resultado' && moneda && <><p>Precio actual en dólares</p><p className="coin-card__price">{formatearPrecio(moneda.precio)}</p><p>Fuente: CoinGecko</p></>}
    {estado === 'vacio' && <p>No hay precio disponible en este momento.</p>}
    {estado === 'error' && <><p role="alert">No pudimos consultar el precio.</p><button className="button" onClick={() => { setEstado('carga'); setIntento(n => n + 1); }}>Reintentar</button></>}
  </section></main>;
}
