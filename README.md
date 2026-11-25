# Pulso Abierto - Actividad 3

Seguí trabajando sobre la aplicación de la Actividad 2. Muestra los precios de Bitcoin, Ethereum y Solana con CoinGecko.

## Para probar

```bash
npm install
npm run dev
npm run typecheck
npm run build
npm test
```

## Cambios

- Los favoritos se guardan con Zustand y se conservan al actualizar la página.
- Se pueden marcar desde las tarjetas y desde el detalle.
- La cantidad de favoritos se calcula a partir de la lista.
- Las consultas siguen usando el servicio de precios y tienen estados de carga, resultado, vacío y error.
- Se agregaron pruebas con Vitest y Testing Library sin llamar a CoinGecko.
