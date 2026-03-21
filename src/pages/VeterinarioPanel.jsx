import React from "react";
import { useSearchParams } from "react-router-dom";
import MascotasTab from "../components/MascotasTab.jsx";
import VeterinarioHome from "../components/VeterinarioHome.jsx";
import VeterinarioCitasTab from "@/components/VeterinarioCitasTab.jsx";

const VeterinarioPanel = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "home";

  const goToTab = (targetTab) => {
    setSearchParams({ tab: targetTab });
  };

  const renderTab = () => {
    switch (tab) {
      case "home":
        return <VeterinarioHome goToTab={goToTab} />;
      case "mascotas":
        return <MascotasTab />;
      case "citas":
        return < VeterinarioCitasTab />;
      default:
        return <VeterinarioHome goToTab={goToTab} />;
    }
  };

  return <div className="p-4">{renderTab()}</div>;
};

export default VeterinarioPanel;
