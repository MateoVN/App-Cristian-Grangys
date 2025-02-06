import { useEffect, useState } from "react";
import { allPaymentMethods } from "../data/allpaymentmethods";


export function usePaymentMethods () {
    const [paymentMethod, setPaymentMethod]= useState([]);

    useEffect(()=> {
            const fetchPaymentMethodData = async () => {
                try{
                    const paymentM = await allPaymentMethods();
                    const formattedPaymentMethod = paymentM.map(([index, methods]) => ({
                        index,
                        methods
                    }));
    
                    setPaymentMethod(formattedPaymentMethod)
                }catch(error){
                    console.log("Error al obtern el paymentMethods", error);
                    
                }
            };
    
            fetchPaymentMethodData();
        },[]);
        
        return paymentMethod;
}