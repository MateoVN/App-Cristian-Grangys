export async function deleteMobile(data, idMobile) {
    const url = `http://192.168.100.50:8000/vehiculo/delete/${idMobile}`
    
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            console.log(response.text())
            throw new Error(`Error: ${response.status}`);
        }
    } catch (error) {
        console.error('Error al eliminar la hoja:', error);
        throw error; 
    }
}