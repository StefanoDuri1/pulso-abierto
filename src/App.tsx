import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import PaginaInicio from './paginas/PaginaInicio';
import PaginaDetalle from './paginas/PaginaDetalle';
import PaginaNoEncontrada from './paginas/PaginaNoEncontrada';
export default function App() {
  return <BrowserRouter><header className="site-header"><div className="container">
    <h1><Link className="enlace-titulo" to="/">Pulso Abierto</Link></h1>
    <p className="site-header__description">Consultá los precios de Bitcoin, Ethereum y Solana en dólares.</p>
  </div></header>
  <Routes><Route path="/" element={<PaginaInicio />} /><Route path="/criptomonedas/:id" element={<PaginaDetalle />} /><Route path="*" element={<PaginaNoEncontrada />} /></Routes>
  <footer className="site-footer"><div className="container"><p>Datos obtenidos de <a href="https://www.coingecko.com/" target="_blank" rel="noreferrer">CoinGecko</a>.</p><p>Programación Web - Actividad 3</p></div></footer>
  </BrowserRouter>;
}
