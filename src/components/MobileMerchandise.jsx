
export function MobileMerchandise ({mergeProductsAndMobileStock}) {
    return(
        <>
            <section className="container-orders">
            <table className="table-caracters">
                <thead>
                <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Peso</th>
                </tr>
                </thead>
                <tbody>
                    {mergeProductsAndMobileStock.map((product) => (
                        <tr key={product.code}>
                            <td>{product.code}</td>
                            <td>{product.name}</td>
                            <td>
                                {product.quantity}
                            </td>
                            <td>{product.weight}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
        </>
        
    )
}