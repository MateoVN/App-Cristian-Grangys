export async function allDebsOfDebtors(idClient) {
    const url = `http://192.168.100.50:8000/client/debtors-orders/${idClient}`
    try{
        const response = await fetch(url, {method:"GET"})

        if(!response.ok){
            console.log(response.text())
            throw new Error(`Fetch fail ${response.status}`)
        }

        const data = await response.json()

        if(data && typeof data === "object" && Object.keys(data).length > 0){
            return data;
        }else{
            console.warn("El servidor devolvió un arreglo vacío o un formato inesperado:", data)
            return [];
        }
    }catch(error){
        console.error("Erro al intentar acceder al servidor",error)
        return[];
    }
}