export async function UpDatePaper(paperData) {
     const url = "http://192.168.100.50:8000/hoja/on";

     try{
        const response = await fetch(url, {
            method:"POST",
            headers:{ "Content-Type": "application/json"},
            body: JSON.stringify(paperData),
        });
        if(!response.ok){
            throw new Error(`Fetch fail ${response.status}`);
        }
     } catch (error){
        console.error("Error al obtener los datos del servidor;", error);
        return [];
     }
}