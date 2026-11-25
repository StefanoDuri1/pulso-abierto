import { Link } from 'react-router-dom';
export default function PaginaNoEncontrada() {
  return <main className="container contenido-principal"><section className="panel"><h2>Página no encontrada</h2><p>La dirección que ingresaste no existe.</p><Link to="/">Volver al inicio</Link></section></main>;
}
