export async function UpDateOrder(orderData) {
    const url = "http://192.168.100.50:8000/orders/on"

    try{
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json",},
            body: JSON.stringify(orderData),
        });
        if(!response.ok){
            console.log(response.text())
            throw new Error(`Fetch fail ${response.status}`);
        }
        
        
    } catch (error) {
        console.error("Error al obtener los datos del servidor;", error)
        return [];
    }
}