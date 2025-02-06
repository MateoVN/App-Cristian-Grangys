export async function modifyPaper(paper){
    const url = "http://192.168.100.50:8000/hoja/up-header"

    try{
        const response = await fetch(url, {
            method:"Put",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify(paper)
        });

        if(!response.ok){
            throw new Error(`Fetch fail${response.status}`)
        }
    } catch (error){
        console.error("Error al obtener datos del servidor;", error)
        return [];
    }
}