import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const Registro = () => {
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mensajeError, setMensajeError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const manejarEnvio = async (e) => {
        e.preventDefault();
        setMensajeError("");
        setSuccess("");
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, apellidos, email, password })
        });
        if (res.ok) {
            setSuccess("¡Registro exitoso! Ahora puedes entrar.");
            setTimeout(() => navigate("/iniciar-sesion"), 1200);
        } else {
            const data = await res.json();
            if (data.message && data.message.toLowerCase().includes("invalid credentials")) {
                setMensajeError("Usuario y contraseña no válidos");
            } else if (data.message && data.message.toLowerCase().includes("email and password are required")) {
                setMensajeError("Escribe todos los campos");
            } else {
                setMensajeError(data.message || "Error");
            }
        }
    };

    const bgStyle = {
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundImage: "url('https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=cover,format=auto,quality=85,width=1920/keyart/GRMG8ZQZR-backdrop_wide')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    };

    return (
        <div style={bgStyle}>
            <div className="container-fluid h-100">
                <div className="row h-100 w-100">
                    <div className="col-12 col-md-5 col-lg-4 d-flex align-items-center h-100" style={{ minHeight: 400 }}>
                        <div className="p-4 rounded-4 shadow-lg w-100" style={{ background: "rgba(111,66,193,0.90)", border: "2px solid #fff", maxWidth: 400 }}>
                            <h3 className="mb-4 text-warning text-center">¡Únete a la tripulación!</h3>
                            <form onSubmit={manejarEnvio}>
                                <div className="mb-3">
                                    <input className="form-control" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input className="form-control" placeholder="Apellidos" value={apellidos} onChange={e => setApellidos(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input className="form-control" placeholder="Correo electrónico" value={email} onChange={e => setEmail(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input className="form-control" type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
                                </div>
                                {mensajeError && <div className="alert alert-danger">{mensajeError}</div>}
                                {success && <div className="alert alert-success">{success}</div>}
                                <button className="btn btn-warning w-100" type="submit">Registrarse</button>
                            </form>
                            <div className="text-center mt-3">
                                <Link to="/iniciar-sesion" className="text-white">¿Ya tienes cuenta? Inicia sesión</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-0 col-md-7 col-lg-8"></div>
                </div>
            </div>
        </div>
    );
};

export { Registro as Signup };
