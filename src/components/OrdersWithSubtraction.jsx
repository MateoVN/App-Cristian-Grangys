export function OrdersWithSubtraction ({setLocalProducts, setLocalQuantities, setModQuantities}) {
    
    const handleQuantityChange = (code, change) => {
        const newQuantities = {
            ...setLocalQuantities,
            [code]: (setLocalQuantities[code] || 0) + change,
        };
        setModQuantities(newQuantities);
    };

    return(
        <section className="container-orders">
            <table className="table-caracters">
                <thead>
                <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                </tr>
                </thead>
                <tbody>
                    {setLocalProducts.map((product) => (
                        <tr key={product.code}>
                            <td>{product.code}</td>
                            <td>{product.name}</td>
                            <td>{setLocalQuantities[product.code] || 0}</td>
                            <td>
                                <div style={{ display: "flex", alignItems: "center" }}>
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