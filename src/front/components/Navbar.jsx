
export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg" style={{ background: "#6f42c1", minHeight: 44, padding: "0 0.3rem" }}>
			<div className="container-fluid" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 0 }}>
				<span className="navbar-brand d-flex align-items-center" style={{ marginRight: 0, paddingLeft: 0 }}>
					<img src="https://static.wikia.nocookie.net/onepiece/images/7/75/One_Piece_Logo.png/revision/latest?cb=20120706185846&path-prefix=es" alt="One Piece Logo" style={{ height: 28, width: "auto", marginLeft: 0, paddingLeft: 0 }} />
				</span>
				<div className="d-flex gap-1 ms-auto" style={{ marginRight: 0 }}>
					<button className="btn btn-link text-white" style={{ textDecoration: "none", fontWeight: 500, padding: '0 6px' }} tabIndex={-1} type="button" onClick={e => e.preventDefault()}>Iniciar sesión</button>
					<button className="btn btn-link text-white" style={{ textDecoration: "none", fontWeight: 500, padding: '0 6px' }} tabIndex={-1} type="button" onClick={e => e.preventDefault()}>Acerca de</button>
				</div>
			</div>
		</nav>
	);
};