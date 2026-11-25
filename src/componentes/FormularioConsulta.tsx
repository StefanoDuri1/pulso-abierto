import { useState, type FormEvent } from 'react';
import { z } from 'zod';
import type { ModoPrueba } from '../tipos/monedas';

const esquema = z.object({
  busqueda: z.string().trim().min(2, 'Escribí al menos 2 caracteres.'),
  modo: z.enum(['real', 'demora', 'vacio', 'error']),
});

type Propiedades = {
  consultando: boolean;
  alConsultar: (texto: string, modo: ModoPrueba) => void;
};

export default function FormularioConsulta({ consultando, alConsultar }: Propiedades) {
  const [busqueda, setBusqueda] = useState('monedas');
  const [modo, setModo] = useState<ModoPrueba>('real');
  const [errores, setErrores] = useState<{ busqueda?: string; modo?: string }>({});

  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const resultado = esquema.safeParse({ busqueda, modo });
    if (!resultado.success) {
      const campos = resultado.error.flatten().fieldErrors;
      setErrores({ busqueda: campos.busqueda?.[0], modo: campos.modo?.[0] });
      return;
    }
    setErrores({});
    alConsultar(resultado.data.busqueda, resultado.data.modo);
  }

  return <section className="panel" aria-labelledby="consulta-titulo">
    <h2 id="consulta-titulo">Consultar precios</h2>
    <form className="price-form" onSubmit={enviar} noValidate>
      <label htmlFor="busqueda">Buscar criptomoneda</label>
      <input id="busqueda" value={busqueda} onChange={e => setBusqueda(e.target.value)}
        placeholder="Ej: bitcoin, eth o sol" aria-invalid={!!errores.busqueda} aria-describedby={errores.busqueda ? 'error-busqueda' : undefined} />
      {errores.busqueda && <p id="error-busqueda" className="error-campo">{errores.busqueda}</p>}
      <label htmlFor="modo">Tipo de consulta</label>
      <select id="modo" value={modo} onChange={e => setModo(e.target.value as ModoPrueba)} aria-invalid={!!errores.modo}>
        <option value="real">Consulta real</option>
        <option value="demora">Consulta con demora</option>
        <option value="vacio">Simular sin resultados</option>
        <option value="error">Simular error</option>
      </select>
      {errores.modo && <p className="error-campo">{errores.modo}</p>}
      <p className="field-help">Escribí el nombre o símbolo de una moneda. Para ver todas, dejá "monedas".</p>
      <button className="button" type="submit" disabled={consultando}>{consultando ? 'Consultando...' : 'Consultar precios'}</button>
    </form>
  </section>;
}
