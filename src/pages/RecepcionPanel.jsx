import React from "react";
import { useSearchParams } from "react-router-dom";
import ClientesTab from "@/components/ClientesTab";
import MascotasTab from "@/components/MascotasTab";
import CitasTab from "@/components/CitasTab";
import RecepcionHome from "@/components/RecepcionHome";

const RecepcionPanel = () => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "home";

  return (
    <div className="p-4">
      {tab === "home" && <RecepcionHome />}
      {tab === "clientes" && <ClientesTab />}
      {tab === "mascotas" && <MascotasTab />}
      {tab === "citas" && <CitasTab />}
    </div>
  );
};

export default RecepcionPanel;
