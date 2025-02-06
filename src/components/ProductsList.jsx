import { useEffect, useState } from 'react';
import "../css/productslist.css"
import { useStore } from '../hooks/store';
import { Orders } from './Orders';
import { mergeProductsAndOrders } from '../hooks/useMergeProductsAndOrders'
import { PaymentMethod } from './PaymentMethod';
import { MinimumPayment } from './MinimumPayment';
import { upDateSale } from '../data/updateSale';
import { Link } from 'react-router-dom';

export function ProductsList () {
  
  const [trigger,  setTrigger] = useState(0)
const {ordersDetailsUser, fetchOrdersDetailsUser, 
       products, fetchProducts, 
       payments, fetchPayments} = useStore()
    
  useEffect(()=>{

    const idhoja = localStorage.getItem("idHojaUser");

  if (!navigator.onLine) {

    // Cargar datos desde localStorage
    const localProducts = JSON.parse(localStorage.getItem("products"));
    const localPayments = JSON.parse(localStorage.getItem("payments"));
    const localOrdersDetailsUser = JSON.parse(localStorage.getItem("ordersDetailsUser"));

    if (localProducts) fetchProducts(localProducts);
    if (localPayments) fetchPayments(localPayments);
    if (localOrdersDetailsUser) fetchOrdersDetailsUser(localOrdersDetailsUser);
  } else {

    // Realizar las llamadas a la BD y guardar en localStorage
    fetchOrdersDetailsUser(idhoja).then((data) => localStorage.setItem("ordersDetailsUser", JSON.stringify(data)));
    fetchProducts().then((data) => localStorage.setItem("products", JSON.stringify(data)));
    fetchPayments().then((data) => localStorage.setItem("payments", JSON.stringify(data)));
  }

  },[trigger, fetchOrdersDetailsUser, fetchProducts, fetchPayments]);


  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState(""); 
  const [quantities, setQuantities] = useState({});
  const [amountPaid, setAmountPaid] = useState(0); // Estado para el monto pagado
  const [amountToPay, setAmountToPay] = useState(0);
  

  //*--------------------------------------------------------------------*/
  // Función para manejar clic en una dirección
  const handleAddressClick = async (order) => {
    const mergedOrder = mergeProductsAndOrders(products, order);
    setSelectedOrder(mergedOrder);

    setSelectedPaymentMethodId(order.medio_id);
    const initialQuantities = Object.fromEntries(
      mergedOrder.pedido.map(([code, quantity]) => [code, quantity])
    );

    setQuantities(initialQuantities);
    console.log("el total",order.total_pedido ," el saldo ", order.saldo)
    const total = order.total_pedido
    console.log("final ", total)
    setAmountToPay(total);
  
  };

  //*--------------------------------------------------------------------*/
  // Función para manejar cambios en el monto pagado
  const handleAmountPaidChange = (value) => {
    setAmountPaid(value); // Actualizar el estado del monto pagado
  };

  //*--------------------------------------------------------------------*/
  const handleQuantitiesChange = (newQuantities) => {
    setQuantities(newQuantities);
    console.log("cambio de cantidades ", newQuantities)
    // Recalcular el monto total a pagar
    const newAmountToPay = Object.entries(newQuantities).reduce(
      (total, [code, quantity]) => {
        const product = products.find((product) => parseInt(product.code) === parseInt(code));
        console.log("El total ", total)
        return total + (product ? product.public_price * quantity : 0);
      },
      0
    );

    setAmountToPay(newAmountToPay);
  };

  //*--------------------------------------------------------------------*/
  const handleCompleteSale= async () => {
    // Obtener el id_carga_venta del localStorage
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const id_carga_venta = userInfo ? userInfo.carga : null;

  if (!id_carga_venta) {
    console.error("No se encontró el id_carga_venta en userInfo");
    return;
  }

  // Crear los códigos y cantidades en formato de string
  
  const codigosFiltrados = [];
  const cantidadesFiltradas = [];
  
  Object.entries(quantities).forEach(([codigo, cantidad]) => {
    if (cantidad > 0) {
      codigosFiltrados.push(codigo);
      cantidadesFiltradas.push(cantidad);
    }
  });

  // Crear los strings separados por comas
  const codigos = codigosFiltrados.join(',');
  const cantidades = cantidadesFiltradas.join(',');

  // Crear el objeto data según el formato requerido
  console.log("el selected orders", selectedOrder)
  const data = {
    id_carga_venta: id_carga_venta,
    id_pedido: selectedOrder ? selectedOrder.id_orden : null, // O usa un valor por defecto
    id_medio: selectedPaymentMethodId,
    cantidad_pago: amountPaid,
    codigos: codigos,
    cantidades: cantidades
  };

  // Llamar a la función upDateSale y manejar la respuesta
  try {
    console.log(data)
    const result = await upDateSale(data);
    console.log("Venta actualizada con éxito", result);
    setTrigger(prev => prev + 1)
    setSelectedOrder(null)
    setAmountToPay(0)
    setAmountPaid(0)
    setQuantities({})
    selectedPaymentMethodId("")

    // Aquí puedes manejar la respuesta si es necesario (ej. mostrar un mensaje al usuario)
  } catch (error) {
    console.error("Error al actualizar la venta:", error);
  }
  }

  //*--------------------------------------------------------------------*/
  const montoAPagar =(order, index) => {
    if( selectedOrder?.id_orden === null || order?.id_orden ===  null){
      console.log("montoAPagar 1 ",order.saldo)
      return order.total_pedido - order.saldo
    }
    if(selectedOrder?.id_orden === order?.id_orden){
      console.log("montoAPagar 2: saldo_",order.saldo," total_",amountToPay, " y el indice ", index)
      const result = amountToPay - order.saldo
      return result
    }
    console.log("montoAPagar 3: saldo_",order.saldo," total_",order.total_pedido, " y el indice ", index)
      return (order.total_pedido - order.saldo) || 0
    
  }
  const saldoFinal = () =>{
    return `${amountToPay - selectedOrder.saldo}$`
  }

  return (
    <div className='container-all-productslist'>
      <div className='container-title-productslist'>
        <h1>Lista de Pedidos</h1>
      </div>
        
        <div className='table-products'>  
          <table >
            <thead>
              <tr>
                <th>Direccines</th>
                <th>Saldo</th>
                <th>Valor del pedido actual</th>
                <th>Montotal del pedido mas deudas</th>
                <th>¿Esta pago?</th>
                <th>Entregado</th>
              </tr>
            </thead>
            {ordersDetailsUser.map((order, index) => (
            <tbody key={index}>
              <tr>
                <td >
                  <button onClick={() =>handleAddressClick(order)}>
                      {order.direccion}
                  </button>
                </td>
                <td>
                  {order.saldo}
                </td>
                <td>
                  {order.total_pedido}
                </td>
                <td>
                {montoAPagar(order, index)}
                </td>
                <td>
                  {order.pago}
                </td>
                <td>
              <input 
              type="checkbox"
              checked={order.venta === 1 ? true: order.venta === 0 ? false: null} />
                </td>             
              </tr>
            </tbody>
            ))}
          </table>
              
        </div>
        <br />

        {selectedOrder && (
          <div className='container-modify-sell'>
            <Orders
                setLocalProducts={products}
                setLocalQuantities={quantities}
                setModQuantities={handleQuantitiesChange}
            />
            
          
            <div className='container-amountopay-button-endsell-paymentmethod-and-minimumpayment'>
              <PaymentMethod
                  selectedPaymentMethodId={selectedPaymentMethodId}
                  paymentMethod={payments}
                  setSelectedPaymentMethodId={setSelectedPaymentMethodId}
              />
              <div className='container-minimumpayment-amountopay-and-button-endsell'>
                <MinimumPayment
                    amountPaid={amountPaid}
                    onAmountPaidChange={handleAmountPaidChange}
                />
                <p>Monto a Pagar: {saldoFinal()}$</p>
                
              </div>
            </div>
            <button type="button" onClick={() => handleCompleteSale()}>Terminar Venta</button>
            <button>Emitir Remito</button>
            
            
          </div> 
        )}
        <button id='button-back-products-list'><Link to="/menu">Volver</Link></button>
    </div>
);
}