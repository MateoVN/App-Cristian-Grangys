export async function upDatePay(data) {
    const url = "http://192.168.100.50:8000/sales/pay"
    try{
        const response = await fetch(url, {
                method:"POST",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify(data),
        })
        if(!response.ok){
            console.log(response.text())
            throw new Error(`Fetch fail ${response.status} ${response.statusText}`)
        }
    } catch (error){
        console.error("Error al obtener los datos del servidor;", error);
        return [];
    }
}