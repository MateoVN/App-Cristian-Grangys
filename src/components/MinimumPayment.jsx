

export function MinimumPayment ({ amountPaid, onAmountPaidChange }) {
    // Manejar cambios en el input
  const handleChange = (e) => {
    const value = parseFloat(e.target.value) || 0; // Asegurar que sea un número
    onAmountPaidChange(value); // Notificar al componente padre
  };

  return (
    <section className="container-all-minimumpayment">
      <label htmlFor="amount-paid">Monto Pagado</label>
      <input
        id="amount-paid"
        type="number"
        value={amountPaid} // Usar el valor desde el estado del padre
        onChange={handleChange} // Manejar cambios
      />
    </section>
  );
}