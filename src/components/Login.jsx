import { useEffect, useId } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import { sendLoginRequest } from "../data/login";
import { useLogin } from "../context/LoginContext";



export function Login() {
  const idUser = useId();
  const idPassword = useId();
  const navigate = useNavigate();
  const {setUser} = useLogin()
  
  useEffect(() => {
    localStorage.removeItem("loginData");
    setUser(null); // Limpia también el estado del contexto
  }, [setUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formElement = e.target; // Obtener el formulario HTML
    try {
      const response = await sendLoginRequest(formElement); // Enviar el formulario
      
      
      if (response.access_token) {
        // Guarda los datos de login en localStorage
        localStorage.setItem("loginData", JSON.stringify(response));
        
        // Actualiza el estado del usuario en el contexto
        setUser(response);
    

        if (response?.rol === 'admin') {
          navigate("/ventana-del-administrador");

        } else {
          navigate("/menu");
        }
        
      } else {
        console.error("Error en login:", response.message);
      }
    } catch (err) {
      console.error("Error en el servidor:", err);
      localStorage.removeItem("loginData");
    }
  };
  
  return (
    <section className="container-login">
      <h1 className="title">Ingrese el Usuario</h1>
      <form id="login" className="form-login" onSubmit={handleSubmit}>
        <label htmlFor={idUser}>Usuario:</label>
        <input id={idUser} name="username" type="text" />
        <label htmlFor={idPassword}>Contraseña:</label>
        <input id={idPassword} name="password" type="password" />
        <button type="submit">Ingresar</button>
      </form>
    </section>
  );
}

