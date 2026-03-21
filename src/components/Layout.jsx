import { Link, useLocation, useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isRecepcionRoute = location.pathname.startsWith("/recepcion");
  const isVeterinarioRoute = location.pathname.startsWith("/veterinario");

  const adminTabs = [
    { id: "clientes", label: "Clientes" },
    { id: "medicamentos", label: "Medicamentos" },
    { id: "usuarios", label: "Usuarios" },
    { id: "mascotas", label: "Mascotas" },
    { id: "servicios", label: "Servicios" },
    { id: "empleados", label: "Empleados" },
  ];

  const recepcionTabs = [
    { id: "clientes", label: "Clientes" },
    { id: "mascotas", label: "Mascotas" },
    { id: "citas", label: "Programar Cita" },
  ];

  const veterinarioTabs = [
    { id: "mascotas", label: "Mascotas" },
    { id: "citas", label: "Citas" }
  ];

  const getTabsForRoute = () => {
    if (isAdminRoute) return adminTabs;
    if (isRecepcionRoute) return recepcionTabs;
    if (isVeterinarioRoute) return veterinarioTabs;
    return [];
  };

  const tabs = getTabsForRoute();
  const isPanel = isAdminRoute || isRecepcionRoute || isVeterinarioRoute;

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    navigate("/");
  };

  return (
    <div className="layout-container">
      <header className="header-top">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon">
              <Link to="/">
                <img src="/logoVetCare.png" alt="Vetcare+ logo" className="rounded-lg" />
              </Link>
            </div>
            <h1 className="brand-name">Vetcare+</h1>
          </div>
        </div>
      </header>

      {!isPanel ? (
        <nav className="header-nav">
          <div className="nav-content">
            <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>Inicio</Link>
            <Link to="/servicios" className={`nav-link ${isActive("/servicios") ? "active" : ""}`}>Servicios</Link>
            <Link to="/nosotros" className={`nav-link ${isActive("/nosotros") ? "active" : ""}`}>Sobre Nosotros</Link>
            <Link to="/login" className={`nav-link ${isActive("/login") ? "active" : ""}`}>Acceso</Link>
          </div>
        </nav>
      ) : (
        <nav className="header-nav">
          <div className="nav-content">
            <Link
              className={`nav-link ${location.search.includes("home") ? "active" : ""}`}
              to={
                isAdminRoute
                  ? "/admin?tab=home"
                  : isRecepcionRoute
                    ? "/recepcion?tab=home"
                    : isVeterinarioRoute
                      ? "/veterinario?tab=home"
                      : "#"
              }
            >
              Inicio
            </Link>

            {tabs.map((tab) => (
              <Link
                key={tab.id}
                to={`${location.pathname}?tab=${tab.id}`}
                className={`nav-link ${location.search.includes(tab.id) ? "active" : ""}`}
              >
                {tab.label}
              </Link>
            ))}

            <button
              onClick={logout}
              className="nav-link text-red-600 hover:text-red-800"
              style={{ border: "none", background: "transparent" }}
            >
              Cerrar sesión
            </button>
          </div>
        </nav>
      )}

      <main className="main-content">{children}</main>

      {!isPanel && (
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Vetcare+</h3>
              <p>Cuidando a tus mascotas con amor y profesionalismo.</p>
            </div>
            <div className="footer-section">
              <h4>Contacto</h4>
              <p>Tel: (555) 123-4567</p>
              <p>Email: info@vetcareplus.com</p>
            </div>
            <div className="footer-section">
              <h4>Horario</h4>
              <p>Lun - Vie: 9:00 - 20:00</p>
              <p>Sáb: 9:00 - 14:00</p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 Vetcare+. Todos los derechos reservados.</p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
