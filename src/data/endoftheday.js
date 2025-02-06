export async function endOfTheDay(data) {
    const url = "http://192.168.100.50:8000/carga/off-work"

    try{
        const response = await fetch(url, {
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });
        
        if(!response.ok){
            console.log(response.text())
            throw new Error(`Fetch fail ${response.status}`)
        }
        return 1;
    } catch( error ){
        console.error("Error al obtener los datos del servidor:", error);
        return 0;
    }
    
}