# Pulso Abierto - Actividad 4

## Descripción del proyecto

Pulso Abierto es una aplicación web que permite consultar los precios de Bitcoin, Ethereum y Solana en dólares mediante la API de CoinGecko.

La aplicación permite buscar criptomonedas, consultar sus detalles y seleccionar favoritos, que se conservan después de recargar la página.

En esta actividad trabajé sobre la versión desarrollada en el Módulo 3, preparando la aplicación para su publicación en producción.

## Tecnologías utilizadas

- React
- TypeScript
- Vite
- React Router
- Zustand
- Zod
- Vitest
- Testing Library
- API de CoinGecko
- Git y GitHub
- Vercel

## Instalación y ejecución

Para instalar las dependencias del proyecto:

`npm install`

Para ejecutar la aplicación en el entorno de desarrollo:

`npm run dev`

## Pruebas automatizadas

Para ejecutar las pruebas:

`npm run test`

Para verificar el tipado de TypeScript:

`npm run typecheck`

## Refactorización y mantenibilidad

Identifiqué que el código encargado de formatear los precios en dólares estaba duplicado en los archivos TarjetaMoneda.tsx y PaginaDetalle.tsx.

Para solucionar esta duplicación, creé el archivo src/utilidades/formatoPrecio.ts, que contiene una función reutilizable denominada formatearPrecio.

Luego modifiqué los dos componentes para utilizar esta función, manteniendo el formato original de los precios.

Para comprobar que el cambio no metiera bugs, ejecuté las pruebas automatizadas y generé el build. Las cinco pruebas finalizaron correctamente y la aplicación compiló sin errores.

## Build productivo

Para generar la versión de producción:

`npm run build`

Este comando verifica el código TypeScript y genera los archivos necesarios para producción dentro de la carpeta dist.

Para comprobar localmente la versión compilada:

`npm run preview`

## Repositorio de GitHub

El código fuente se encuentra disponible en el siguiente repositorio:

https://github.com/StefanoDuri1/pulso-abierto

Se configuró el archivo .gitignore para evitar versionar las dependencias, los archivos generados y las configuraciones locales.

## Despliegue en Vercel

Vinculé el repositorio de GitHub con Vercel y configuré el despliegue utilizando los siguientes parámetros:

- Framework: Vite.
- Directorio raíz: ./.
- Comando de instalación: npm install.
- Comando de compilación: npm run build.
- Directorio de salida: dist.

La aplicación utiliza la API pública de CoinGecko sin necesidad de configurar credenciales privadas.

URL de la aplicación publicada:

https://pulso-abierto-navy.vercel.app/

## Corrección de rutas en producción

Durante la validación de la aplicación publicada, detecté un error 404 al recargar una página de detalle.

El problema se producía porque Vercel intentaba resolver las rutas internas de React Router como recursos físicos del servidor.

Para solucionarlo, incorporé el archivo vercel.json con una regla de reescritura que permite dirigir las solicitudes al archivo index.html.

Subí la modificación a GitHub y Vercel realizó un nuevo despliegue. Posteriormente comprobé que las páginas de detalle podían recargarse correctamente.

## Verificación final

- Pruebas automatizadas: 5 de 5 aprobadas.
- Archivos de pruebas: 3 de 3 correctos.
- Build productivo: generado correctamente.
- Preview local: comprobado correctamente.
- Despliegue en Vercel: realizado correctamente.
- Recarga de rutas internas: corregida y verificada.
- Fecha de verificación: 25/11/2026.
