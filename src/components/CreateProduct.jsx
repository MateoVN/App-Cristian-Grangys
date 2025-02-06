import { useState } from "react"
import { upDateProduct } from "../data/updateproduct";
import { ShowAllProducts } from "./ShowAllProducts";
import "../css/creadores.css"

export function CreateProduct(){
    const [refresh, setRefresh] = useState(0)
    const [infoProduct, setInfoProduct] = useState({
        codigo:"",
        nombre:"",
        descripcion:"",
        peso:"",
        precio:"",
        precio_publico:"",
        
    });

    const handleChange= (e) =>{
        const{type, name, value, checked} = e.target;
        setInfoProduct((prev) =>({
            ...prev,
            [name]:type === "checkbox" ? checked : value,
        }));
    }

    const handleSubmitProduct = async (e) => {
        e.preventDefault();

        for (const key in infoProduct){
            if (infoProduct[key] === "" ){
                alert("Todos los campos deben estar completos.");
                return;
            }
        }

        try{
            const formattedProduct = {
                ...infoProduct,
                codigo:parseInt(infoProduct.codigo, 10),
                peso:parseInt(infoProduct.peso, 10),
                precio:parseInt(infoProduct.precio, 10),
                precio_publico: parseFloat(infoProduct.precio_publico),
            };

            await upDateProduct(formattedProduct)

            setInfoProduct({
                codigo:"",
                nombre:"",
                descripcion:"",
                peso:"",
                precio:"",
                precio_publico:"",
            })
            setRefresh(prev => prev +1)
        } catch(error){
            console.error("Error al intentar crear el producto ", error)
        }
    }
    return(
        <section className="contenedor-del-creadores">
            <form onSubmit={handleSubmitProduct}>
                <label htmlFor="">Codigo</label>
                <input 
                    type="number"
                    name="codigo"
                    id="CreateProduct-codigo"
                    value={infoProduct.codigo}
                    onChange={handleChange} />

                <label htmlFor="">Nombre</label>
                <input 
                    type="text"
                    name="nombre"
                    id="CreateProduct-nombre"
                    value={infoProduct.nombre}
                    onChange={handleChange} />

                <label htmlFor="">Descripcion</label>
                <input 
                    type="text"
                    name="descripcion"
                    id="CreateProduct-descripcion"
                    value={infoProduct.descripcion}
                    onChange={handleChange} />

                <label htmlFor="">Peso</label>
                <input 
                    type="number"
                    name="peso"
                    id="CreateProduct-peso"
                    value={infoProduct.peso}
                    onChange={handleChange} />

                <label htmlFor="">Precio de Compra</label>
                <input 
                    type="number"
                    name="precio"
                    id="CreateProduct-precio"
                    value={infoProduct.precio}
                    onChange={handleChange} />

                <label htmlFor="">Precio al Publico</label>
                <input 
                    type="number"
                    name="precio_publico"
                    id="CreateProduct-precio_publico"
                    value={infoProduct.precio_publico}
                    onChange={handleChange} />
                
                <button type="submit">Aceptar</button>
            </form>
            <ShowAllProducts refresh={refresh}/>
        </section>
    )
}