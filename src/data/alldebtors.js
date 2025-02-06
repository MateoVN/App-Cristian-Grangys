export async function allDebtors() {
    const url = "http://192.168.100.50:8000/client/debtors"

    try{
        const response = await fetch(url, {method:"GET"})

        if(!response.ok){
            console.log(response.text())
            throw new Error(`Fetch fail ${response.status}`)
        }

        const data = await response.json()
        console.log("la infodata del fetch allDebtors ", data)

        if(data && typeof data === "object" && Object.keys(data).length > 0){
            console.log("aaaaaaaaaaaaaaaaaa")
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