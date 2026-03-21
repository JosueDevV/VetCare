import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";

const RecepcionHome = ({ onSelectTab }) => {
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
        <section className="bg-white rounded-xl shadow-lg p-10 flex flex-col md:flex-row items-center gap-10 fade-in-element">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Bienvenido al Panel de <span className="text-indigo-600">Recepción</span>
            </h1>
            <p className="text-gray-600 mb-6 text-lg">
              Administra clientes, mascotas y citas de manera rápida y sencilla.
              Tu trabajo como recepcionista ahora es más eficiente y organizado.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => onSelectTab("clientes")} className="px-6 py-2">
                Clientes
              </Button>
              <Button onClick={() => onSelectTab("mascotas")} variant="outline" className="px-6 py-2">
                Mascotas
              </Button>
              <Button onClick={() => onSelectTab("citas")} variant="secondary" className="px-6 py-2">
                Citas
              </Button>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <img
              src="/BannerGatoPerro.png"
              alt="Mascota veterinaria"
              className="w-72 md:w-96"
            />
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-6 mt-10 fade-in-element">
          <div className="feature-card bg-indigo-50 p-6 rounded-xl shadow text-center hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold mb-2 text-indigo-700">Gestión de Clientes</h3>
            <p className="text-gray-600">Registra y consulta la información de tus clientes rápidamente.</p>
          </div>
          <div className="feature-card bg-green-50 p-6 rounded-xl shadow text-center hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold mb-2 text-green-700">Control de Mascotas</h3>
            <p className="text-gray-600">Administra la información de las mascotas de manera organizada.</p>
          </div>
          <div className="feature-card bg-purple-50 p-6 rounded-xl shadow text-center hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold mb-2 text-purple-700">Agenda de Citas</h3>
            <p className="text-gray-600">Lleva un control eficiente de las citas y horarios del día a día.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RecepcionHome;
