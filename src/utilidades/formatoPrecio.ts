const formato = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'USD'
});

export function formatearPrecio(precio: number): string {
    return formato.format(precio);
}