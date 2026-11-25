import { useRef, useState } from 'react';
import FormularioConsulta from '../componentes/FormularioConsulta';
import EstadoConsulta from '../componentes/EstadoConsulta';
import ListaMonedas from '../componentes/ListaMonedas';
import { obtenerPrecios } from '../servicios/precios';
import { usarFavoritos } from '../estado/favoritos';
import type { EstadoConsulta as Estado, ModoPrueba, Moneda } from '../tipos/monedas';

export default function PaginaInicio() {
  const [monedas, setMonedas] = useState<Moneda[]>([]);
  const [filtro, setFiltro] = useState('');
  const [estado, setEstado] = useState<Estado>('inicial');
  const favoritas = usarFavoritos(estado => estado.favoritos);
  const numeroConsulta = useRef(0);
  const [ultimaConsulta, setUltimaConsulta] = useState<{ texto: string; modo: ModoPrueba } | null>(null);
  const textoBuscado = filtro.trim().toLowerCase();
  const visibles = monedas.filter(moneda => {
    if (textoBuscado === 'monedas') return true;
    return moneda.nombre.toLowerCase().includes(textoBuscado) ||
      moneda.simbolo.toLowerCase().includes(textoBuscado);
  });
  const estadoVisible = estado === 'resultado' && visibles.length === 0 ? 'vacio' : estado;

  async function consultar(texto: string, modo: ModoPrueba) {
    const consultaActual = ++numeroConsulta.current;
    setUltimaConsulta({ texto, modo });
    setFiltro(texto);
    setEstado('carga');
    setMonedas([]);
    try {
      const resultado = await obtenerPrecios(modo);
      if (consultaActual !== numeroConsulta.current) return;
      setMonedas(resultado);
      setEstado(resultado.length ? 'resultado' : 'vacio');
    } catch {
      if (consultaActual === numeroConsulta.current) setEstado('error');
    }
  }

  return <main className="container contenido-principal">
    <p className="results-meta">Favoritas guardadas: {favoritas.length}</p>
    <FormularioConsulta consultando={estado === 'carga'} alConsultar={consultar} />
    <EstadoConsulta estado={estadoVisible} alReintentar={() => { if (ultimaConsulta) void consultar(ultimaConsulta.texto, ultimaConsulta.modo); }} />
    <section className="panel" id="resultados" aria-labelledby="resultados-titulo" aria-busy={estado === 'carga'}>
      <h2 id="resultados-titulo">Resultados</h2>
      {estado === 'inicial' && <p>Los precios van a aparecer acá cuando hagas una consulta.</p>}
      {estado === 'carga' && <p>Consultando los datos...</p>}
      {estadoVisible === 'vacio' && <p>No hay resultados para mostrar.</p>}
      {estadoVisible === 'resultado' && <><p className="results-meta">Se encontraron {visibles.length} criptomonedas.</p>
        <ListaMonedas monedas={visibles} /></>}
    </section>
  </main>;
}
