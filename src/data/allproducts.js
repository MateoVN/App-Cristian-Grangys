export async function allProducts() {
    const url = "http://192.168.100.50:8000/codigos/all";
  
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