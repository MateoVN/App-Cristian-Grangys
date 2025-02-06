export async function allDetailsOrder(id_pedido) {
    const url = `http://192.168.100.50:8000/orders/detail/${id_pedido}`;

    try {
        const response = await fetch(url, { method: "GET" });
        if (!response.ok) {
            throw new Error(`Fetch failed with status ${response.status}`);
        }

        const data = await response.json();
        
        if (data && Array.isArray(data.order_detail) && data.order_detail.length > 0) {
            return data.order_detail;
        } else {
            console.warn("El servidor devolvió un array vacío o un formato inesperado:", data);
            return [];
        }
    } catch (error) {
        console.error("Error al obtener los datos del servidor:", error);
        return [];
    }
}
