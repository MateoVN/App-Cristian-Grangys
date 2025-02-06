import { useEffect, useState } from "react";
import { allProducts } from "../data/allproducts.js";

export function useProducts (){
    const[products, setProducts] = useState([]);

     useEffect(() => {
            const fetchStockData = async () => {
              try {
              
                const stock = await allProducts();
                
                const formattedProducts = stock.map(([code, name, description, weight, price]) => ({
                  code,
                  name,
                  description, 
                  weight, 
                  price
                }));
      
                setProducts(formattedProducts);
              } catch (error) {
                console.error("Error al obtener el stock:", error);
              }
            };
          
            fetchStockData();
          }, []);

    return products;
}