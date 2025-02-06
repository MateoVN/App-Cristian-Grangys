import { useEffect, useState } from "react"
import { useStore } from "../hooks/store"
import { modifyProduct } from "../data/modifyproduct"
import { deleteProduct } from "../data/deleteproduct"
import "../css/creadores.css"

export function ShowAllProducts({refresh}){
    const {products, fetchProducts} = useStore()
    const [trigger , setTrigger] = useState(0)
    const [isModified, setIsModified] = useState(false)
    const [productModify, setProductModify] = useState({
        code: 0,
        name: "",
        description: "", 
        weight: 0, 
        purchase_price: 0,
        public_price: 0
    })
    const [productCopy, setProductCopy] =useState({
        code: 0,
        name: "",
        description: "", 
        weight: 0, 
        purchase_price: 0,
        public_price: 0
    })

    useEffect(() => {
        fetchProducts()
    },[refresh, trigger, fetchProducts])

    const handleChangeProduct = (e) =>{
        const {name, value} = e.target
        setProductModify((prev) =>({
            ...prev,
            [name]:value
        }))
    }
    const handleOnClickModifyProduct =async (product) =>{
        setProductModify(product)
        setProductCopy(product)
        setIsModified(true)
    }
    const handleOnClickAccept = async () =>{
        try{
            console.log("el user modificado ", productModify)
            console.log("el user antes de modificar ", productCopy)
            if(productModify === productCopy){
                return console.log("No se a registrado modificaciones del producto")
            }
            if(
                productModify.code === 0 ||
                productModify.code === null ||
                productModify.code === undefined ||
                productModify.name === "" ||
                productModify.name === null ||
                productModify.name === undefined ||
                productModify.description === "" ||
                productModify.description === null ||
                productModify.description === undefined ||
                productModify.weight === 0 ||
                productModify.weight === null ||
                productModify.weight === undefined ||
                productModify.purchase_price === 0 ||
                productModify.purchase_price === null ||
                productModify.purchase_price === undefined ||
                productModify.public_price === 0 ||
                productModify.public_price === null ||
                productModify.public_price === undefined 
            ){
                throw new Error("Uno o más campos están vacíos o contienen valores inválidos.");
            }
            const data = {
                codigo: productModify.code,
                nombre: productModify.name,
                descripcion: productModify.description,
                peso: productModify.weight,
                precio: productModify.purchase_price,
                precio_publico: productModify.public_price
            }
            console.log("la data que se va a cargar en el fetch", data)

            await modifyProduct(data)
            setTrigger(prev => prev + 1)
            setProductCopy({
                code: 0,
                name: "",
                description: "", 
                weight: 0, 
                purchase_price: 0,
                public_price: 0
            })
            setProductModify({
                code: 0,
                name: "",
                description: "", 
                weight: 0, 
                purchase_price: 0,
                public_price: 0
            })
            setIsModified(false)
        }catch (error){
            console.error("Error al intentar guardar el producto", error)
        }
    }
    const handleOnClickDeleteProduct = async (product) =>{
        try{
            if( product === "" ||
                product === null ||
                product === undefined
            ){
                throw new Error("No se a encontrado el vehiculo que se desea eliminar.")
            }
            if(
                product.code === 0 ||
                product.code === null ||
                product.code === undefined ||
                product.name === "" ||
                product.name === null ||
                product.name === undefined ||
                product.description === "" ||
                product.description === null ||
                product.description === undefined ||
                product.weight === 0 ||
                product.weight === null ||
                product.weight === undefined ||
                product.purchase_price === 0 ||
                product.purchase_price === null ||
                product.purchase_price === undefined ||
                product.public_price === 0 ||
                product.public_price === null ||
                product.public_price === undefined 
            ){
                throw new Error("Uno o más campos están vacíos o contienen valores inválidos.");
            }
            const data = {
                codigo: product.code,
                nombre: product.name,
                descripcion: product.description,
                peso: product.weight,
                precio: product.purchase_price,
                precio_publico: product.public_price
            }
            console.log("la data que se va a cargar en el fetch", data)

            await deleteProduct(data)
            setTrigger(prev => prev + 1 )
            setProductModify({
                code: 0,
                name: "",
                description: "", 
                weight: 0, 
                purchase_price: 0,
                public_price: 0
            })
        } catch (error){
            console.log("Error al intentar borrar el Producto", error)
        } 
    }
    return(
        <>
        <div className="contenedor-de-tablas">
            <table>
                <thead>
                    <tr>
                        <th>
                            Indice
                        </th>
                        <th>
                            Codigo
                        </th>
                        <th>
                            Nombre
                        </th>
                        <th>
                            Descripcion
                        </th>
                        <th>
                            Peso
                        </th>
                        <th>
                            Precio
                        </th>
                        <th>
                            Precio al Publico
                        </th>
                        <th>
                            Modificar
                        </th>
                        <th>
                            Borrar
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) =>(
                    <tr key={`ShowAllProducts ${product.code}`}>
                        <td>
                            {index}
                        </td>
                        <td>
                            {product.code}
                        </td>
                        <td>
                            {product.name}
                        </td>
                        <td>
                            {product.description}
                        </td>
                        <td>
                            {product.weight}
                        </td>
                        <td>
                            {product.purchase_price}
                        </td>
                        <td>
                            {product.public_price}
                        </td>
                        <td>
                            <button onClick={() =>handleOnClickModifyProduct(product)}> Modificar </button>
                        </td>
                        <td>
                            <button onClick={() => handleOnClickDeleteProduct(product)}> Borrar </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {isModified && (
            <section className="contenedor-de-modificadores">
                <label 
                    htmlFor={`${productModify.code} ${productModify.name}`}>Nombre</label>
                <input 
                    id={`${productModify.code} ${productModify.name}`}
                    type="text"
                    name="name"
                    value={productModify.name}
                    onChange={handleChangeProduct} /> 
                <label 
                    htmlFor={`${productModify.code} ${productModify.description}`}>Descripcion</label>
                <input 
                    id={`${productModify.code} ${productModify.description}`}
                    type="text"
                    name="description"
                    value={productModify.description}
                    onChange={handleChangeProduct} />
                <label 
                    htmlFor={`${productModify.code} ${productModify.weight}`}>Peso</label>
                <input 
                    id={`${productModify.code} ${productModify.weight}`}
                    type="number"
                    name="weight"
                    value={productModify.weight}
                    onChange={handleChangeProduct} />
                <label 
                    htmlFor={`${productModify.code} ${productModify.purchase_price}`}>Precio de Compra</label>
                <input 
                    id={`${productModify.code} ${productModify.purchase_price}`}
                    type="number"
                    name="purchase_price"
                    value={productModify.purchase_price}
                    onChange={handleChangeProduct} />
                <label 
                    htmlFor={`${productModify.code} ${productModify.public_price}`}>Precio al Publico</label>
                <input 
                    id={`${productModify.code} ${productModify.public_price}`}
                    type="number"
                    name="public_price"
                    value={productModify.public_price}
                    onChange={handleChangeProduct} />
                <button onClick={handleOnClickAccept}>Aceptar Modificaciones</button>
            </section>
        )}
        </>
    )
}