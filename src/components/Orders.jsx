/* eslint-disable react/prop-types */
import "../css/orders.css"

export function Orders ({setLocalProducts, setLocalQuantities, setModQuantities}) {
    
    const handleQuantityChange = (code, change) => {
      const newQuantities = {
        ...setLocalQuantities,
        [code]: Math.max((setLocalQuantities[code] || 0) + change, 0),
      };
      setModQuantities(newQuantities)
    };

    return(
        <section className="container-orders">
            <table className="table-caracters">
                <thead>
                <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>-/+</th>
                </tr>
                </thead>
                <tbody>
                    {setLocalProducts.map((product) => (
                        <tr key={product.code}>
                            <td>{product.code}</td>
                            <td id="orders-name-product">{product.name}</td>
                            <td>{setLocalQuantities[product.code] || 0}</td>
                            <td>
                                <div className="container-button-orders">
                                    <button onClick={() => handleQuantityChange(product.code, -1)}>-</button>
                                    <button onClick={() => handleQuantityChange(product.code, 1)}>+</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}
