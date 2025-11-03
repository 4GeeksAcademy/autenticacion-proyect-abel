import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Private = () => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const token = sessionStorage.getItem('token')
        if (!token) return navigate('/login')
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/private`, {
            headers: { 'Authorization': 'Bearer ' + token }
        }).then(async res => {
            if (!res.ok) return navigate('/login')
            const data = await res.json()
            setUser(data.user)
        })
    }, [])

    return (
        <div style={{
            minHeight: "100vh",
            backgroundImage: "url('https://cdn.sortiraparis.com/images/80/66131/1049067-one-piece-celebrez-les-25-ans-de-l-anime-a-l-hotel-de-la-marine.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <div className="p-4 rounded-4 shadow-lg" style={{ background: "rgba(111,66,193,0.90)", border: "2px solid #fff", maxWidth: 420, width: "100%" }}>
                <h3 className="mb-4 text-warning">Zona privada</h3>
                {user ? (
                    <div>
                        <p className="text-white">Bienvenido, <span className="fw-bold text-warning">{user.email}</span></p>
                        <p className="text-white">¡Has accedido a la zona privada!</p>
                    </div>
                ) : (
                    <p className="text-white">Cargando...</p>
                )}
            </div>
        </div>
    )
}
