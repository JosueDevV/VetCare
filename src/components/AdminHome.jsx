import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";

const AdminHome = ({ onSelectTab }) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".fade-in-element");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex justify-center py-10 bg-gray-50 min-h-screen">
      <div className="w-full max-w-[1200px] px-6">
        {/* Hero Section */}
        <section className="bg-white rounded-xl shadow-lg p-10 flex flex-col md:flex-row items-center gap-10 fade-in-element">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Bienvenido al Panel de <span className="text-indigo-600">Administrador</span>
            </h1>
            <p className="text-gray-600 mb-6 text-lg">
              Administra usuarios, roles, servicios, medicamentos y supervisa todo el sistema desde aquí.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => onSelectTab("usuarios")}>Usuarios</Button>
              <Button onClick={() => onSelectTab("roles")} variant="outline">Roles</Button>
              <Button onClick={() => onSelectTab("servicios")} variant="secondary">Servicios</Button>
              <Button onClick={() => onSelectTab("medicamentos")} variant="secondary">Medicamentos</Button>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <img
              src="/BannerGatoPerro.png"
              alt="Administrador"
              className="rounded-xl shadow-xl w-72 md:w-96"
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-6 mt-10 fade-in-element">
          <div className="feature-card bg-red-50 p-6 rounded-xl shadow text-center hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold mb-2 text-red-700">Gestión de Usuarios</h3>
            <p className="text-gray-600">Administra cuentas y roles de todo el personal.</p>
          </div>
          <div className="feature-card bg-purple-50 p-6 rounded-xl shadow text-center hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold mb-2 text-purple-700">Control de Servicios</h3>
            <p className="text-gray-600">Agrega o edita los servicios y productos del sistema.</p>
          </div>
          <div className="feature-card bg-blue-50 p-6 rounded-xl shadow text-center hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold mb-2 text-blue-700">Supervisión</h3>
            <p className="text-gray-600">Visualiza reportes y estadísticas del sistema.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminHome;
