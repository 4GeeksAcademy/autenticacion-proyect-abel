
import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-expand-lg" style={{ background: "#6f42c1" }}>
			<div className="container-fluid">
				<a className="navbar-brand d-flex align-items-center" href="/">
					<img src="https://static.wikia.nocookie.net/onepiece/images/7/75/One_Piece_Logo.png/revision/latest?cb=20120706185846&path-prefix=es" alt="One Piece Logo" style={{ height: 40, width: "auto" }} />
				</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse justify-content-end" id="navbarNav">
					<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<a className="nav-link text-white" href="/iniciar-sesion">Iniciar Sesión</a>
						</li>
						<li className="nav-item">
							<a className="nav-link text-white" href="/acerca">Acerca de</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};