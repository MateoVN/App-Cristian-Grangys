/* eslint-disable no-unused-vars */

import { allClients } from '../data/allclient';
import { allUsers } from '../data/alluser';
import { AllPapers } from '../data/allPapers';
import { allOrders } from '../data/allorders';
import { allMobiles } from '../data/allmobiles';
import { create } from 'zustand';
import { allPaymentMethods } from '../data/allpaymentmethods';
import { allDetailsOrder } from '../data/alldetailsorder';
import { allProducts } from '../data/allproducts.js';
import { allSalesDay, allSalesDayQuantitiesAndPreice } from '../data/allsalesday.js';
import { allSalesWeek, allSalesWeekQuantitiesAndPreice } from '../data/allsalesweek.js';
import { allSalesMonth, allSalesMonthQuantitiesAndPreice } from '../data/allsalesmonth.js';
import { allSalesSemester, allSalesSemesterQuantitiesAndPreice } from '../data/allsalessemester.js';
import { allSalesYear, allSalesYearQuantitiesAndPreice } from '../data/allsalesyear.js';
import { allOrdersDetailsUsers } from '../data/allordersdetailsuser.js';
import { allMobileStock } from '../data/allmobileStock.js';
import { allMobileStockWithOutUnderWay } from '../data/allmobilestockwithoutunderway.js';
import { allTotalMobileStock } from '../data/alltotalmobilestock.js';
import { allDebtors } from '../data/alldebtors.js';
import { allDebsOfDebtors } from '../data/alldebsofdebtors.js';

export const useStore = create((set) => ({
  clients: [],
  orders: [],
  papers: [],
  users: [],
  truckModels: [],
  payments: [],
  detailsorder:[],
  products:[],
  salesDay:[],
  salesDayQuantitiesAndPreice:[],
  salesWeek:[],
  salesWeekQuantitiesAndPreice:[],
  salesMonth:[],
  salesMonthQuantitiesAndPreice:[],
  salesSemester:[],
  salesSemesterQuantitiesAndPreice:[],
  salesYear:[],
  salesYearQuantitiesAndPreice:[],
  ordersDetailsUser:[],
  allmobilestock:[],
  allmobilestockwithoutunderWay:[],
  alltotalmobilestock:[],
  alldebtors:[],
  alldebsofdebtors:[],

  fetchClients: async () => {
    try {
      const clientsData = await allClients();
      const formattedClients = clientsData.map(([id, direccion, saldo]) => ({
        id,
        direccion,
        saldo
      }));
      set({ clients: formattedClients });
    } catch (error) {
      console.error("Error al obtener los clientes", error);
    }
  },

  fetchOrders: async () => {
    try {
        const Orders = await allOrders();
        const formattedOrders = Orders.map(([ id_pedido, id_hoja, id_cliente, id_medios, pago]) => ({
            id_pedido,
            id_hoja,
            id_cliente,
            id_medios,
            pago
        }));

        set({ orders: formattedOrders});
        return formattedOrders
    } catch (error){
        console.log("Error al obtener las ordenes", error);
    }
  },

  fetchPapers: async () => {
    try {
        const papers = await AllPapers();
        const formattedPapers = papers.map(([id, date, idUser, idMobile]) => ({
            id,
            date,
            idUser,
            idMobile,
        }));
        console.log(formattedPapers)
            set({ papers: formattedPapers});

    } catch (error) {
        console.error("Error al obtener papers:", error);
    }
  },

  fetchUsers: async () => {
    try{
        const users = await allUsers();
        const fomattedUsers = users.map(
          ([id, name, rol, ifisactive, numberPhone, password]) =>({
            id,
            name,
            rol,
            ifisactive,
            numberPhone,
            password
        }));

        set({ users: fomattedUsers});
    } catch (error){
        console.log("Error al obtener los users", error);
    }
  },

  fetchTruckModels: async () => {
    try{
        const mobile = await allMobiles();
        const formattedMobile = mobile.map(([id, patent, trackModel, loadCapacity, patent_hash]) =>({
            id, 
            patent, 
            trackModel, 
            loadCapacity,
            patent_hash
        }));
        
        set({ truckModels: formattedMobile});
    }catch(error){
        console.log("Error al obtener los moviles", error)
    }
  },
  fetchPayments: async () => {
    try{
        const paymentM = await allPaymentMethods();
        const formattedPaymentMethod = paymentM.map(([index, methods]) => ({
            index,
            methods
        }));

        set({ payments: formattedPaymentMethod})
    }catch(error){
        console.log("Error al obtern el paymentMethods", error);
        
    }
  },
  fetchDetailsOrder: async (id_pedido) => {
    try {

      const data = await allDetailsOrder(id_pedido);
      const formattedDetailsOrder = data.map(([id_dato, codigo_pedido, id_pedido_fk, cantidad]) => ({
        codigo_pedido,
        cantidad
      }));
  
      set({ detailsorder: formattedDetailsOrder });
      return formattedDetailsOrder;

    } catch (error) {
      console.error("Error al obtener los detalles de la orden:", error);
    }
  },
  fetchProducts: async () => {
    try{
      const data = await allProducts();
      const formattedProducts = data.map(([code, name, description, weight, purchase_price, public_price]) =>({
        code,
        name,
        description, 
        weight, 
        purchase_price,
        public_price
      }));

      set ({products: formattedProducts});
      return formattedProducts
    } catch (error) {
      console.error("Error al obtener el stock:", error);
    }
  },
  fetchSalesDay: async () =>{
    try{

      const data = await allSalesDay();
      const formattedSales = data.map(([codigo, cantidad, precio])=>({
        codigo, 
        cantidad, 
        precio,
      }))

      set ({salesDay: formattedSales})
      return formattedSales
    } catch (error){
      console.error("Error al obtener las ventas: ", error)
    }
     
  },
  fetchSalesDayQuantitiesAndPreice: async () =>{
    try{

      const data = await allSalesDayQuantitiesAndPreice();
      const formattedSales = [data.total_precio, data.total_cant]

      set ({salesDayQuantitiesAndPreice: formattedSales})
      console.log(formattedSales)
      return formattedSales
    } catch (error){
      console.error("Error al obtener las ventas: ", error)
    }
  },
  fetchSalesWeek: async () =>{
    try{

      const data = await allSalesWeek();
      const formattedSales = data.map(([codigo, cantidad, precio])=>({
        codigo, 
        cantidad, 
        precio,
      }))

      set ({salesWeek: formattedSales})
      return formattedSales
    } catch (error){
      console.error("Error al obtener las ventas: ", error)
    }
     
  },
  fetchSalesWeekQuantitiesAndPreice: async () =>{
    try{

      const data = await allSalesWeekQuantitiesAndPreice();
      const formattedSales = [data.total_precio, data.total_cant]

      set ({salesWeekQuantitiesAndPreice: formattedSales})
      console.log(formattedSales)
      return formattedSales
    } catch (error){
      console.error("Error al obtener las ventas: ", error)
    }
  },
  fetchSalesMonth: async () =>{
    try{

      const data = await allSalesMonth();
      const formattedSales = data.map(([codigo, cantidad, precio])=>({
        codigo, 
        cantidad, 
        precio,
      }))

      set ({salesMonth: formattedSales})
      return formattedSales
    } catch (error){
      console.error("Error al obtener las ventas: ", error)
    }
     
  },
  fetchSalesMonthQuantitiesAndPreice: async () =>{
    try{

      const data = await allSalesMonthQuantitiesAndPreice();
      const formattedSales = [data.total_precio, data.total_cant]

      set ({salesMonthQuantitiesAndPreice: formattedSales})
      console.log(formattedSales)
      return formattedSales
    } catch (error){
      console.error("Error al obtener las ventas: ", error)
    }
  },
  fetchSalesSemester: async () =>{
    try{

      const data = await allSalesSemester();
      const formattedSales = data.map(([codigo, cantidad, precio])=>({
        codigo, 
        cantidad, 
        precio,
      }))

      set ({salesSemester: formattedSales})
      return formattedSales
    } catch (error){
      console.error("Error al obtener las ventas: ", error)
    }
     
  },
  fetchSalesSemesterQuantitiesAndPreice: async () =>{
    try{

      const data = await allSalesSemesterQuantitiesAndPreice();
      const formattedSales = [data.total_precio, data.total_cant]

      set ({salesSemesterQuantitiesAndPreice: formattedSales})
      console.log(formattedSales)
      return formattedSales
    } catch (error){
      console.error("Error al obtener las ventas: ", error)
    }
  },
  fetchSalesYear: async () =>{
    try{

      const data = await allSalesYear();
      const formattedSales = data.map(([codigo, cantidad, precio])=>({
        codigo, 
        cantidad, 
        precio,
      }))

      set ({salesYear: formattedSales})
      return formattedSales
    } catch (error){
      console.error("Error al obtener las ventas: ", error)
    }
     
  },
  fetchSalesYearQuantitiesAndPreice: async () =>{
    try{

      const data = await allSalesYearQuantitiesAndPreice();
      const formattedSales = [data.total_precio, data.total_cant]

      set ({salesYearQuantitiesAndPreice: formattedSales})
      console.log(formattedSales)
      return formattedSales
    } catch (error){
      console.error("Error al obtener las ventas: ", error)
    }
  },
  fetchOrdersDetailsUser: async (idhoja) => {
    try {
      const data = await allOrdersDetailsUsers(idhoja);
      console.log("La data que me llega del fetch ", data)
  
      /// Iterar sobre las claves de `data`
    const formattedData = Object.entries(data).map(([id_orden, cliente]) => ({
      id_orden:id_orden, // Mantener el identificador de la orden
      direccion: cliente.direccion,
      id_cliente: cliente.id_cliente,
      saldo: cliente.saldo,
      medio_id:cliente.medio[0],
      medio_nombre:cliente.medio[1],
      venta:cliente.venta,
      pedido: cliente.pedido.map(([codigo, cantidad]) => ({
        codigo,
        cantidad,
      })), // Formatea cada elemento de pedido
      total_pedido: cliente.total_pedido,
      pago:cliente.pago[0]
      
    }));
    set({ordersDetailsUser: formattedData})

    return formattedData; // Devuelve los datos formateados
  } catch (error) {
    console.error("Error al obtener detalles del pedido:", error);
    throw error; // Propaga el error para manejarlo en el nivel superior
  }
},
//[[codigo,cantidad,peso,cant_afec],[...]
fetchAllMobileStock: async (param) =>{
  try{
    const data = await allMobileStock(param);

    const formattedData = data.map(([codigo,cantidad,peso,cant_afec, libre]) =>({
      codigo,
      cantidad,
      peso,
      cant_afec,
      libre
    }));

    set({allmobilestock: formattedData})
    return formattedData
  }catch (error){
    console.error("Error al obtener detalles del stock del vehiculo", error)
  }
},
fetchAllMobileStockWithOutUnderWay: async (idHoja) =>{
  try{
    const data = await allMobileStockWithOutUnderWay(idHoja)

    const formattedData =  data.map(([codigo,cantidad]) =>({
      codigo,
      cantidad
    }));

    set({allmobilestockwithoutunderWay:formattedData})
    return formattedData
  } catch(error){
    console.error("Error al obtener detalles del stock del vehiculo", error)
  }
},
fetchAllTotalMobileStock: async (idHoja) => {
  try{
    const data = await allTotalMobileStock(idHoja)

    const formattedData =  data.map(([codigo,cantidad,peso]) =>({
      codigo,
      cantidad,
      peso
    }));

    set({alltotalmobilestock:formattedData})
    return formattedData
  } catch(error){
    console.error("Error al obtener detalles del stock del vehiculo", error)
  }
},
fetchAllDebtors: async () => {
  try {
    const data = await allDebtors(); // Llama al endpoint para obtener los datos
     console.log("la data del store ", data)
    // Procesar y formatear los datos
    const formattedData = Object.entries(data).map(([id_cliente, clienteData]) => {
      const { direccion, saldo, pedidos } = clienteData;

      // Procesar los pedidos
      const formattedPedidos = Object.entries(pedidos || {}).map(
        ([id_pedido, pedidoData]) => {
          const { detalle, pagos } = pedidoData;

          return {
            id_pedido,
            detalle: detalle || [], // Lista de detalles
            pagos: pagos || []      // Lista de pagos
          };
        }
      );

      return {
        id_cliente,
        direccion,
        saldo,
        pedidos: formattedPedidos
      };
    });
    console.log("la data del store formateada ", formattedData)

    // Actualizar el estado con la data formateada
    set({ alldebtors: formattedData });

    return formattedData;
  } catch (error) {
    console.error("Error al obtener la lista de deudores", error);
  }
},
fetchAllDebsOfDebtors: async (idClient) =>{
  try{
    const data = await allDebsOfDebtors(idClient);

    const formattedData = data.map(([id,  ]) => ({

    }));

    set({allDebsOfDebtors: formattedData})
    return formattedData
  } catch(error){
    console.error("Error al obtener detalles del stock del vehiculo", error)
  }
}
}));