import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
	useEffect(() => {
		document.documentElement.style.height = '100vh';
		document.body.style.height = '100vh';
		document.body.style.overflow = 'hidden';
		return () => {
			document.documentElement.style.height = '';
			document.body.style.height = '';
			document.body.style.overflow = '';
		};
	}, []);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [mensajeError, setMensajeError] = useState("");
	const [success, setSuccess] = useState("");
	const navigate = useNavigate();

	const manejarEnvio = async (e) => {
		e.preventDefault();
		setMensajeError("");
		setSuccess("");
		const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/token`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password })
		});
		if (res.ok) {
			const data = await res.json();
			sessionStorage.setItem("token", data.token);
			setSuccess("¡Bienvenido!");
			setTimeout(() => navigate("/privado"), 1000);
		} else {
			const data = await res.json();
			if (data.message && data.message.toLowerCase().includes("invalid credentials")) {
				setMensajeError("Usuario y contraseña no válidos");
			} else if (data.message && data.message.toLowerCase().includes("email and password are required")) {
				setMensajeError("Escribe email y contraseña");
			} else {
				setMensajeError(data.message || "Error");
			}
		}
	};

	const bgStyle = {
		width: "100vw",
		height: "100vh",
		overflow: "hidden",
		backgroundImage: "url('https://wallpapers.com/images/hd/one-piece-thousand-sunny-shipat-sea-9xg39eojjkcp951q.jpg')",
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
							<h3 className="mb-4 text-warning text-center">Inicia sesión</h3>
							<form onSubmit={manejarEnvio}>
								<div className="mb-3">
									<input className="form-control" placeholder="Correo electrónico" value={email} onChange={e => setEmail(e.target.value)} />
								</div>
								<div className="mb-3">
									<input className="form-control" type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />
								</div>
								{mensajeError && <div className="alert alert-danger">{mensajeError}</div>}
								{success && <div className="alert alert-success">{success}</div>}
								<button className="btn btn-warning w-100" type="submit">Entrar</button>
							</form>
							<div className="text-center mt-3">
								<a href="/registro" className="text-white">¿No tienes cuenta? Regístrate</a>
							</div>
						</div>
					</div>
					<div className="col-0 col-md-7 col-lg-8"></div>
				</div>
			</div>
		</div>
	);
};