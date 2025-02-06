export const VehicleDetails = ({ patente, cargaMaxima }) => (
    <section className="vehicle-details">
      <h2>Patente: {patente || "Sin Asignar"}</h2>
      <h2>Carga Máxima: {cargaMaxima || "Sin Asignar"} kg</h2>
    </section>
  );