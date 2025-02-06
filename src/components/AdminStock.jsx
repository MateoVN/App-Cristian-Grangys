import { useEffect, useState } from "react";
import { sendStockRequest, upDateStock } from "../data/stock";
import "../css/adminstock.css"

export function AdminStock () {
    const [products, setProducts] = useState([])
    const [updatedProducts, setUpdatedProducts] = useState({});
    
    useEffect(() => {
      const fetchStockData = async () => {
        try {
          
          const stock = await sendStockRequest();
          console.log("Datos recibidos:", stock);
          
          
          const formattedProducts = stock.map(([code, quantity, name, weight, price, price_public]) => ({
            code,
            quantity,
            name,
            weight, 
            price, 
            price_public
          }));
          
          setProducts(formattedProducts);
        } catch (error) {
          console.error("Error al obtener el stock:", error);
        }
      };
    
      fetchStockData();
    }, []);
      
    const handleQuantityChange = (code, change) => {
      setUpdatedProducts((prev) => ({
        ...prev,
        [code]: (prev[code] || products.find((item) => item.code === code)?.quantity || 0) + change,
      }));
    };
    const prepareStockPayload = () => {
      const codigos = Object.keys(updatedProducts).join(",");
      const cantidades = Object.values(updatedProducts).join(",");
      
      console.log({ 
        codigos:codigos, 
        cantidades:cantidades})
      upDateStock({ 
        codigos:codigos, 
        cantidades:cantidades})
      return { codigos, cantidades };
    };

    return(
        <section className="container-adminstock">
            <table>
                <thead>
                    <tr>
                        <th> Codigo</th>
                        <th>Nombre</th>
                        <th>Peso</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th> Modificaion de cantidades</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item) => (
                        <tr key={item.code}>
                            <td>{item.code}</td>
                            <td>{item.name}</td>
                            <td>{item.weight}</td>
                            <td>${item.price}</td>
                            <td>{updatedProducts[item.code] ?? item.quantity}</td>
                            <td>
                              <button onClick={() => handleQuantityChange(item.code, 1)}>+</button>
                              <button onClick={() => handleQuantityChange(item.code, -1)}>-</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="container-button-accept">
              <button onClick={prepareStockPayload}>Aceptar</button>
            </div>
        </section>
    )
}