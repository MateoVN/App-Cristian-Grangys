import { useState } from "react";
import { upDateUser } from "../data/updateuser";
import { ShowwAllUsers } from "./ShowAllUsers";
import "../css/creadores.css"

export function CreateUser() {
    const [refresh, setRefresh] = useState(0)
    const [formData, setFormData] = useState({
        categoria: "",
        nombre: "",
        ifisactive:false,
        celular: "",
        password: "",
        repetirPassword: "",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que todos los campos estén completos
        for (const key in formData) {
            if (formData[key] === "" || (key === "maneja" && formData[key] === false)) {
                alert("Todos los campos deben estar completos.");
                return;
            }
        }

        // Validar que las contraseñas coincidan
        if (formData.password !== formData.repetirPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        try {
            const data = {
                id: formData.id,
                username:formData.nombre,
                rol: formData.categoria === "Administrador" ? 1 : formData.categoria === "Operario" ? 2 : null,
                disabled:formData.ifisactive, 
                phone:formData.celular,
                password:formData.password
            }
            console.log(data)
            await upDateUser(data); // Llama a la función para enviar los datos

            // Limpiar el formulario
            setFormData({
                categoria: "",
                nombre: "",
                ifisactive:false,
                celular: "",
                password: "",
                repetirPassword: "",
            });
            setRefresh(prev => prev +1)
        } catch (error) {
            console.error("Error al crear el usuario", error);
        }
    };

    return (
        <section className="contenedor-del-creadores">
            <form onSubmit={handleSubmit}>
                <h1>Crea un Usuario</h1>

                <label htmlFor="CreateUser-nombre">Nombre y Apellido</label>
                <input
                    type="text"
                    name="nombre"
                    id="CreateUser-nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                />

                <label htmlFor="CreateUser-categoria">Categoría del Usuario</label>
                <select
                    name="categoria"
                    id="CreateUser-categoria"
                    value={formData.categoria}
                    onChange={handleChange}
                >
                    <option value="">Selecciona una categoría</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Operario">Operario</option>
                </select>

                <label htmlFor="CreateUser-celular">Número de Celular</label>
                <input
                    type="number"
                    name="celular"
                    id="CreateUser-celular"
                    value={formData.celular}
                    onChange={handleChange}
                />
                <label htmlFor="CreateUser-ifisactive">¿Esta activo?</label>
                <input 
                    type="checkbox"
                    name="ifisactive"
                    id="CreateUser-ifisactive"
                    value={formData.ifisactive}
                    onChange={handleChange} 
                />

                <label htmlFor="CreateUser-password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="CreateUser-password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <label htmlFor="CreateUser-repetirPassword">Repetir Password</label>
                <input
                    type="password"
                    name="repetirPassword"
                    id="CreateUser-repetirPassword"
                    value={formData.repetirPassword}
                    onChange={handleChange}
                />

                <button type="submit">Aceptar</button>
            </form>
            <ShowwAllUsers refresh={refresh}/>
        </section>
    );
}