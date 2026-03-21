import React from "react";
import { useSearchParams } from "react-router-dom";

import ClientesTab from "../components/ClientesTab.jsx";
import MedicamentosTab from "../components/MedicamentosTab";
import UsuariosTab from "../components/UsuariosTab";
import MascotasTab from "../components/MascotasTab";
import ServiciosTab from "../components/ServicesTab";
import EmpleadosTab from "../components/EmpleadosTab";
import AdminHome from "../components/AdminHome";

const AdminPanel = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "home";

  const goToTab = (targetTab) => {
    setSearchParams({ tab: targetTab });
  };

  const renderTab = () => {
    switch (tab) {
      case "home":
        return <AdminHome goToTab={goToTab} />;
      case "clientes":
        return <ClientesTab />;
      case "medicamentos":
        return <MedicamentosTab />;
      case "usuarios":
        return <UsuariosTab />;
      case "mascotas":
        return <MascotasTab />;
      case "servicios":
        return <ServiciosTab />;
      case "empleados":
        return <EmpleadosTab />;
      default:
        return <AdminHome goToTab={goToTab} />;
    }
  };

  return <div className="p-4">{renderTab()}</div>;
};

export default AdminPanel;
