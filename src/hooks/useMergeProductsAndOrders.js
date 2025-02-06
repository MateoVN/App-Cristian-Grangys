export function mergeProductsAndOrders(products, ordersDetailsUser) {
    const {id_orden, direccion, id_cliente, saldo, pago, pedido } = ordersDetailsUser;
    console.log("el oders datils en merge", ordersDetailsUser)
    
    // Crear un objeto con las cantidades iniciales en 0 para todos los códigos
    const productQuantities = products.reduce((acc, product) => {
        acc[product.code] = 0;
        return acc;
    }, {});

    // Ajustar las cantidades según el pedido
    pedido.forEach(({ codigo, cantidad }) => {
        if (Object.prototype.hasOwnProperty.call(productQuantities, codigo)) {
            productQuantities[codigo] = cantidad;
        }
    });
    // Crear la lista completa de productos con sus cantidades y precios
    const updatedPedido = products.map((product) => [
        product.code,
        productQuantities[product.code],
        product.price * productQuantities[product.code] || 0,
    ]);

    // Calcular el total del pedido
    const totalPedido = updatedPedido.reduce((sum, [, , subtotal]) => sum + subtotal, 0);

    // Retornar el objeto estructurado
    return {
        id_orden,
        direccion,
        id_cliente,
        saldo,
        pago,
        pedido: updatedPedido,
        total_pedido: totalPedido,
    };
}