
export async function AllPapers (){
    const url = "http://192.168.100.50:8000/hoja/now"
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    console.log(formattedDate)

    try{
        const response = await fetch(url, {
            method:"POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fecha: "2025-01-30" }),
        },
            
        );
        if(!response.ok){
            throw new Error(`Fetch fail ${response.status}`)
        }
        const data = await response.json();

        console.log("el fetch ", data)
        if(Array.isArray(data) && data.length > 0) {
            return data;
        } else {
            console.warn("El servidor devolvió un arreglo vacío o un formato inesperado:", data);
            return [];
        }
    }catch (error) {
        console.error("Error al obtener los datos del servidor:", error);
        return [];
    }
    
}