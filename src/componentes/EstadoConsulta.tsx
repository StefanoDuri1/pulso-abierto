import type { EstadoConsulta as Estado } from '../tipos/monedas';
type Propiedades = { estado: Estado; alReintentar: () => void };
const mensajes: Record<Estado, [string, string, string]> = {
  inicial: ['ℹ', 'Sin consultar', 'Todavía no se realizó ninguna consulta.'],
  carga: ['⌛', 'Cargando', 'Buscando los precios, esperá un momento.'],
  resultado: ['✓', 'Consulta completada', 'Ya podés ver los precios.'],
  vacio: ['∅', 'Sin resultados', 'No encontramos monedas con esa búsqueda.'],
  error: ['!', 'Ocurrió un error', 'No se pudieron obtener los precios. Probá de nuevo.'],
};
export default function EstadoConsulta({ estado, alReintentar }: Propiedades) {
  const [icono, titulo, mensaje] = mensajes[estado];
  return <section className="panel" aria-labelledby="estado-titulo">
    <h2 id="estado-titulo">Estado de la consulta</h2>
    <div className="estado" data-state={estado} role="status" aria-live="polite">
      <span className="estado__icono" aria-hidden="true">{icono}</span>
      <p><strong>{titulo}.</strong> {mensaje}</p>
    </div>
    {estado === 'error' && <button className="button button--secondary" type="button" onClick={alReintentar}>Volver a intentar</button>}
  </section>;
}
