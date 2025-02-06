 import { useEffect, useState } from "react"
import "../css/orderslistadmin.css"
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useStore } from "../hooks/store"
import { MobileOperator } from "./MobileOperator";
import { modifyOrderPaper } from "../data/modifyorderpaper";
import { deleteOrder } from "../data/deleteorder";
import { Orders } from "./Orders";
import { PaymentMethod } from "./PaymentMethod";
import { ClientSelector } from "./ClientSelector";
import { modifyOrderAndDetails } from "../data/modifyOrderAndDetails";


export function OrdersListAdmin () {
  const [trigger, setTrigger] = useState(0);
  const [selectedPaper, setSelectedPaper] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [localProducts, setLocalProducts] = useState([]);
  const [localQuantities, setLocalQuantities] = useState({});
  const [lastOrder, setLastOrder] = useState(null )
  const { clients, fetchClients,
          orders, fetchOrders,
          papers, fetchPapers,
          users, fetchUsers,
          truckModels, fetchTruckModels,
          payments, fetchPayments, 
          detailsorder, fetchDetailsOrder, 
          products, fetchProducts} = useStore();

  useEffect(() => {
    fetchClients();
    fetchOrders();
    fetchPapers();
    fetchUsers();
    fetchTruckModels();
    fetchPayments();
    if(selectedOrder){
     fetchDetailsOrder(selectedOrder.id_pedido);
    }
    fetchProducts();

  },[selectedOrder, trigger, fetchClients,
     fetchOrders, fetchPapers, fetchUsers,
     fetchTruckModels, fetchPayments, fetchDetailsOrder,
     fetchProducts]);

    const isDataLoaded =
    clients.length > 0 &&
    orders.length > 0 &&
    papers.length > 0 &&
    users.length > 0 &&
    truckModels.length > 0 &&
    payments.length > 0 &&
    products.length > 0 
    ;
    
    const lod = detailsorder.length > 0;

    const listOrders = isDataLoaded
    ? orders.map((order, index) => {
        const paper = papers.find((p) => p.id === order.id_hoja);
        const client = clients.find((c) => c.id === order.id_cliente);
        const payment = payments.find((p) => p.index === order.id_medios);

        return {
          index: index + 1,
          id_pedido: order.id_pedido,
          nameclient: client?.direccion || "Desconocido",
          namemobile: paper ? truckModels.find((m) => m.id === paper.idMobile)?.trackModel || "Sin modelo" : "Sin modelo",
          nameUser: paper ? users.find((u) => u.id === paper.idUser)?.name || "Sin usuario" : "Sin usuario",
          namePayment: payment?.methods || "Sin método",
          id_hoja: order.id_hoja,
          id_cliente: order.id_cliente,
          id_medios: order.id_medios
        };
      })
    : [];

    const handleAssignPaper = async (id_pedido) => {
        const selectedPape = selectedPaper[id_pedido];
        if (!selectedPape) {
          alert("Por favor, selecciona un conductor/vehículo antes de asignar.");
          return;
        }
        const data = { id_pedido, id_hoja: selectedPape };
        try {
          await modifyOrderPaper({ data });
          setTrigger((prev) => prev + 1);
          setSelectedPaper((prev) => ({ ...prev, [id_pedido]: null }));
        } catch (error) {
          console.error("Error al asignar la hoja:", error);
        }
      };

    const handleDeleteOrder = async (id_pedido) =>{
        const data = parseInt(id_pedido);

        try{
            await deleteOrder(data);
            setTrigger((prev) => prev + 1);
        }catch(error){
            console.error("Error al eleimar la hoja", error);
        }
    }; 
    
    const handleEditOrder = async (order) => {
        setSelectedOrder(order);
        setIsEditing(true);

        try {
            // Obtener detalles de la orden
            const details = await fetchDetailsOrder(order.id_pedido);

            // Obtener productos desde el store
            const allProducts = await fetchProducts();

            // Combinar datos de productos con detalles
            const combinedProducts = allProducts.map((product) => {
                return {
                    code: product.code,
                    name: product.name || `Producto ${product.code}`,
                };
            });

            // Crear un objeto para las cantidades, asignando 0 si no está en detalles
            const quantities = allProducts.reduce((acc, product) => {
                const detail = details.find((d) => d.codigo_pedido === product.code);
                acc[product.code] = detail ? detail.cantidad : 0;
                return acc;
            }, {});

            setLocalProducts(combinedProducts);
            setLocalQuantities(quantities);
        } catch (error) {
            console.error("Error al obtener detalles del pedido:", error);
        }
    };

    const handleOrderAndDetails = async (order, selectedClientId, selectedPaymentMethodId, quantities, selectedPaper) => {
        if (!selectedClientId || !selectedPaymentMethodId) {
          alert("Por favor selecciona un cliente y un método de pago.");
          return;
        }
      
        const filteredCodes = Object.keys(quantities).filter((code) => quantities[code] > 0);
        const codes = filteredCodes.join(",");
        const amounts = filteredCodes.map((code) => quantities[code]).join(",");
      
        if (!codes || !amounts) {
          alert("Debes seleccionar al menos un producto con cantidad mayor a 0.");
          return;
        }
      
        const orderData = {
          id_pedido: parseInt(order.id_pedido),
          id_hoja: parseInt(selectedPaper ?? 0, 10), 
          id_cliente: parseInt(selectedClientId ?? 0, 10), 
          id_medios: parseInt(selectedPaymentMethodId ?? 0, 10),
          pago: 1,
          codigos: codes,
          cantidad: amounts,
        };
      
        if (JSON.stringify(orderData) === JSON.stringify(lastOrder)) {
          alert("Este pedido ya fue enviado.");
          return;
        }
      
        try {
          await modifyOrderAndDetails(orderData);
          setLastOrder(orderData);
          setTrigger((prev) => prev + 1);
        } catch (error) {
          console.error("Error al enviar el pedido:", error);
        } finally {
          setIsEditing(false);
        }
    };
    
    return (
        <div className="container-all">
            {isEditing && (
              <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                <div id="container-title-order-modify">
                  <h1>Modificando el pedido de: {selectedOrder.nameclient} </h1>
                </div>
                <div className="container-modify-order">
                  
                  
                  {lod && 
                    (<Orders
                        setLocalProducts={localProducts}
                        setLocalQuantities={localQuantities}
                        setModQuantities={setLocalQuantities}
                      />)}
                    <div className="dropdowns-and-buttons-modify-order">
                    
                      <div className="all-dropdown-modify-order">
                        <div className="directions-movil-modify-order">
                          <ClientSelector
                            clients={clients}
                            selectedClientId={selectedOrder?.id_cliente || ""}
                            setSelectedClientId={(value) =>
                              setSelectedOrder((prev) => ({ ...prev, id_cliente: value }))
                            }
                          />
                          <MobileOperator
                            setSelectedPaper={(value) =>
                              setSelectedOrder((prev) => ({ ...prev, id_hoja: value }))
                            }
                            selectedPaper={selectedOrder?.id_hoja || null}
                          />
                        </div>
                        <PaymentMethod 
                        selectedPaymentMethodId={selectedOrder?.id_medios || ""}
                        paymentMethod={payments} 
                        setSelectedPaymentMethodId={(value) =>
                        setSelectedOrder((prev) => ({ ...prev, id_medios: value }))}/>
                      </div>
                      <div className="container-buttons-modify-order">
                        <button
                            onClick={() =>
                                handleOrderAndDetails(
                                selectedOrder,
                                selectedOrder?.id_cliente, // selectedClientId
                                selectedOrder?.id_medios,  // selectedPaymentMethodId
                                localQuantities,
                                selectedOrder?.id_hoja     // selectedPaper
                                )
                            }
                            >
                            Aceptar Modificación
                          </button>
                          <button onClick={() => setIsEditing(false)}>Cancelar</button>
                      </div>
                  </div>
              </div>
            </div>
            )}
            <div className="container-title-more-button-refresh">
              <div id="container-title-orders-list">
                <h1 >Lista de Pedidos</h1>
              </div>
              <button id="orders-list-table-refresh" onClick={async ()=> {
                    await fetchOrders();
                    await fetchPapers();
                }}> <i className="fas fa-sync-alt"></i></button>
            </div>
            <section className="orders-list-table">
                  {!isDataLoaded ? (
                    <div>Cargando...</div>
                    ) : (
                    <table onClick={() => setTrigger((prev) => prev + 1)}>
                        <thead>
                            <tr>
                                <th>Indice</th>
                                <th>Direccion</th>
                                <th>Vehiculo / Conductor</th>
                                <th>Metodo de Pago</th>
                                <th>Modificar</th>
                                <th>Borrar</th>
                                <th>Emitir Remito</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listOrders.map((order) => (
                                <tr key={order.index}>
                                    <td>{order.index}</td>
                                    <td>{order.nameclient}</td>
                                    {order.id_hoja === null ? (
                                        <td>
                                            <MobileOperator setSelectedPaper={(value) =>
                                                            setSelectedPaper((prev) => ({ ...prev, [order.id_pedido]: value }))}
                                                            selectedPaper={selectedPaper?.[order.id_pedido] ?? null}/>
                                            <button onClick={() => {
                                                handleAssignPaper(order.id_pedido);
                                                }}>Asignar</button>
                                        </td>
                                    ) : (
                                        <td>{order.nameUser}/{order.namemobile}</td>
                                    )}
                                    <td>{order.namePayment}</td>
                                    <td><button onClick={() => handleEditOrder(order)}>Modificar</button></td>
                                    <td><button onClick={() => handleDeleteOrder(order.id_pedido)}>Borrar</button></td>
                                    <td><button>Emitir Remito</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
        </div>
    );
}