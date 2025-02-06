/* eslint-disable react/prop-types */
import '../css/PaymentMethod.css'


export function PaymentMethod ({ selectedPaymentMethodId, paymentMethod, setSelectedPaymentMethodId}) {

    

    return(
        <section className="payment-container">
            <label htmlFor="payment-methods">Método de Pago:</label>
            <select id="payment-methods" className="payment-spinner"
            onChange={(e) => setSelectedPaymentMethodId(e.target.value)}
            value={ selectedPaymentMethodId || ""}>
                <option value="">Seleccione una opcion</option>
                {paymentMethod.map((item) => (
                    <option key={item.index} value={item.index}>{item.methods}</option>
                ))}
                
            </select>
            
        </section>
    )

}
