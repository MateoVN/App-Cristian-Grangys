export const UserDetails = ({username, vehiculo})=>(
  <section className='user-details'>
      <img 
        src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" 
        alt="user image"  
        className='img-user'
      />
      <div 
      className='user-details-container'>
          <h2>Nombre: {username|| "Sin Asignar"}</h2>
          <h2>Vehiculo: {vehiculo || "Sin Asignar"}</h2>
      </div>
  </section>
)