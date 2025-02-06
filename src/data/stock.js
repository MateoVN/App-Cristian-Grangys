export async function sendStockRequest() {
  const url = "http://192.168.100.50:8000/stock/all";

  try {
    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      throw new Error(`Fetch failed: ${response.status}`);
    }
    const data = await response.json();

    if(Array.isArray(data) && data.length > 0) {
        return data;
    } else {
        console.warn("El servidor devolvió un arreglo vacío o un formato inesperado:", data);
        return [];
    }
    
  } catch (error) {
    console.error("Error al obtener los datos del servidor:", error);
    return [];
  }
}

export async function upDateStock({codigos, cantidades}) {
  const url = "http://192.168.100.50:8000/stock/up-pack";

  try{
    const response = await fetch(url,{
      method:"PUT",
      headers: {
        "Content-Type": "application/json",},
      body: JSON.stringify({ codigos:codigos, cantidades:cantidades }),
    });

    if (!response.ok) {
      throw new Error(`Fetch failed: ${response.status}`);
    }

  }catch(error){
    console.error("Error al obtener los datos del servidor:", error)
  }
}