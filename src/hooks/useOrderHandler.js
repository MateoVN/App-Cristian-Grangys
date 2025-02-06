import { useState } from "react";
import { UpDateOrder } from "../data/updateorder";

export function useOrderHandler () {
    const [isLoading, setIsLoading] = useState(false);
    const [lastOrder, setLastOrder] = useState(null);

    const handleSubmitOrder = async (selectedClientId, selectecPaymentMethodId, quantities, selectedPaper, paid) => {
        if(!selectedClientId || !selectecPaymentMethodId){
            alert("Por favor selecciona un cliente y un método de pago.");
            return;
        }

        const filteredCodes = Object.keys(quantities).filter((code) => quantities[code] > 0);
        const codes = filteredCodes.join(",");
        const amounts = filteredCodes.map((code) => quantities[code]).join(",");

        if(!codes || !amounts){
            alert("Debes seleccionar al menos un producto con cantidad mayor a 0.");
            return;
        }

        const orderData = {
            id_hoja: parseInt(selectedPaper ?? 0, 10), 
            id_cliente: parseInt(selectedClientId ?? 0, 10), 
            id_medios: parseInt(selectecPaymentMethodId ?? 0, 10),
            pago: parseInt(paid.pago),
            codigos: codes,
            cantidades: amounts,
          };

        if (JSON.stringify(orderData) === JSON.stringify(lastOrder)) {
            alert("Este pedido ya fue enviado")
            return;
        }

        setIsLoading(true);
        try{
            console.log(orderData)
            await UpDateOrder(orderData);
            setLastOrder(orderData);
        } catch (error) {
            console.log("Error al enviar al pedido:", error);
        }finally {
            setIsLoading(false);
        }
    };
    return{ handleSubmitOrder, isLoading };
}