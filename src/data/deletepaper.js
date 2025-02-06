export async function deletPaper(idPaper) {
    const url = `http://192.168.100.50:8000/hoja/delete/${idPaper}`
    
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
    } catch (error) {
        console.error('Error al eliminar la hoja:', error);
        throw error; 
    }
}
