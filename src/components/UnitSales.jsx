/* eslint-disable no-unused-vars */
import { useEffect, useId, useState} from "react"
import "../css/unitsales.css"
import { useStore } from "../hooks/store";
  

export function UnitSales () {
    const {
        products,
        fetchProducts,
        salesDay,
        fetchSalesDay,
        salesWeek,
        fetchSalesWeek,
        salesMonth,
        fetchSalesMonth,
        salesSemester,
        fetchSalesSemester,
        salesYear,
        fetchSalesYear,
        salesDayQuantitiesAndPreice,
        fetchSalesDayQuantitiesAndPreice,
        salesWeekQuantitiesAndPreice,
        fetchSalesWeekQuantitiesAndPreice,
        salesMonthQuantitiesAndPreice,
        fetchSalesMonthQuantitiesAndPreice,
        salesSemesterQuantitiesAndPreice,
        fetchSalesSemesterQuantitiesAndPreice,
        salesYearQuantitiesAndPreice,
        fetchSalesYearQuantitiesAndPreice,
      } = useStore();

    const [currentPeriod, setCurrentPeriod] = useState("day"); // Estado para el periodo
    const [salesData, setSalesData] = useState([]); // Estado para datos de ventas
    const [totalSales, setTotalSales] = useState([0, 0]); // Estado para totales

    const idTotalSales = useId();
    const idTotaldebts = useId();

    useEffect(()=>{
        
        fetchSalesDay()
        fetchProducts()
        fetchSalesDayQuantitiesAndPreice()
        fetchSalesWeek()
        fetchSalesWeekQuantitiesAndPreice()
        fetchSalesMonth()
        fetchSalesMonthQuantitiesAndPreice()
        fetchSalesSemester()
        fetchSalesSemesterQuantitiesAndPreice()
        fetchSalesYear()
        fetchSalesYearQuantitiesAndPreice()

    },[fetchProducts, 
        fetchSalesDay, fetchSalesDayQuantitiesAndPreice,
        fetchSalesWeekQuantitiesAndPreice, fetchSalesWeek,
        fetchSalesMonthQuantitiesAndPreice, fetchSalesMonth,
        fetchSalesSemesterQuantitiesAndPreice, fetchSalesSemester,
        fetchSalesYearQuantitiesAndPreice, fetchSalesYear])

    const isLoading = 
    products.length > 0 &&
    salesDay.length > 0;

    const handlePeriodChange = (period) => {
        setCurrentPeriod(period); // Actualiza el periodo seleccionado
        if(period === "day"){
            setSalesData(salesDay);
            setTotalSales(salesDayQuantitiesAndPreice);
            return
        }
        if(period === "week"){
            setSalesData(salesWeek);
            setTotalSales(salesWeekQuantitiesAndPreice);
            return
        }
        if(period === "month"){
            setSalesData(salesMonth);
            setTotalSales(salesMonthQuantitiesAndPreice);
            return
        }
        if(period === "semester"){
            setSalesData(salesSemester);
            setTotalSales(salesSemesterQuantitiesAndPreice);
            return
        }
        if(period === "year"){
            setSalesData(salesYear);
            setTotalSales(salesYearQuantitiesAndPreice);
            return
        }
      };

     // Fusión de productos y ventas
     const mergedData = products.map((product) => {
        const sale = salesData.find((s) => s.codigo === product.code); // Busca la venta correspondiente al código del producto
        return {
            code: product.code,
            name: product.name,
            cantidad: sale ? sale.cantidad : 0, // Si no se encuentra, cantidad es 0
            precio: sale ? sale.precio : 0, // Si no se encuentra, precio es 0
        };
    });

    return (
        
        <section>
            {!isLoading ?( 
                <div>Cargando...</div>
            ) : (
                <div>
                    <div className="container-title-unitsales">
                        <h1>Clickeá en una fecha para ver sus ventas:</h1>
                    </div>
                    <div className="container-button-unitsales">
                        <button onClick={() => handlePeriodChange("day")}>Día</button>
                        <button onClick={() => handlePeriodChange("week")}>Semana</button>
                        <button onClick={() => handlePeriodChange("month")}>Mes</button>
                        <button onClick={() => handlePeriodChange("semester")}>Semestre</button>
                        <button onClick={() => handlePeriodChange("year")}>Año</button>
                    </div>
                    <div className="container-unitsales">
                        <div className="container-table-unitsales">
                            <table id="table-unitsales">
                                <thead>
                                    <tr>
                                        <td>Código</td>
                                        <td>Nombre</td>
                                        <td>Cantidad Vendida</td>
                                        <td>Precio Total</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mergedData.map((data) => (
                                        <tr key={data.code}>
                                            <td>{data.code}</td>
                                            <td>{data.name}</td>
                                            <td>{data.cantidad}</td>
                                            <td>{data.precio}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="total-sales">
                            <label htmlFor={idTotalSales}>Total de ventas en efectivo:</label>
                            <p id={idTotalSales}>{totalSales[0]}$</p>
                            <label htmlFor={idTotaldebts}>Total de deudas en efectivo:</label>
                            <p id={idTotaldebts}>{totalSales[1]}$</p>
                        </div>
                    </div>
                </div>
            
        )}
        </section>
    );
}