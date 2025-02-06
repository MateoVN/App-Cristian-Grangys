export async function modifyClient (data, idClient) {
    const url = `http://192.168.100.50:8000/client/up/${idClient}`;

    try{
        const response = await fetch(url, {
            method:"PUT",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(data)});

        if(!response.ok){
            console.log(response.text())
            throw new Error(`Fetch fail ${response.status}`);
        };

    }catch (error){
        console.error("Error al obtener datos del servidor; ", error);
        return [];
    }
}