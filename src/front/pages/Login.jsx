import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const IniciarSesion = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mensajeError, setMensajeError] = useState('')
    const [success, setSuccess] = useState('')
    const navigate = useNavigate()

    const manejarEnvio = async (e) => {
        e.preventDefault()
        setMensajeError('')
        setSuccess('')
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        if (res.ok) {
            const data = await res.json()
            sessionStorage.setItem('token', data.token)
            setSuccess('¡Bienvenido!')
            setTimeout(() => navigate('/private'), 1000)
        } else {
            const data = await res.json()
            if (data.message && data.message.toLowerCase().includes('invalid credentials')) {
                setMensajeError('Usuario y contraseña no válidos')
            } else if (data.message && data.message.toLowerCase().includes('email and password are required')) {
                setMensajeError('Escribe email y contraseña')
            } else {
                setMensajeError(data.message || 'Error')
            }
        }
    }

    return (
        <div style={{
            minHeight: "100vh",
            backgroundImage: "url('https://wallpapers.com/images/hd/one-piece-thousand-sunny-shipat-sea-9xg39eojjkcp951q.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingLeft: "2vw"
        }}>
            <div className="p-4 rounded-4 shadow-lg" style={{ background: "rgba(111,66,193,0.90)", border: "2px solid #fff", maxWidth: 400, width: "100%" }}>
                <h3 className="mb-4 text-warning">Entrar</h3>
                <form onSubmit={handleSubmit}>
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
            </div>
        </div>
    )
}

export { IniciarSesion as Login };
