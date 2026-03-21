import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";

const VeterinarioHome = ({ onSelectTab }) => {
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
              Bienvenido al Panel de <span className="text-indigo-600">Veterinario</span>
            </h1>
            <p className="text-gray-600 mb-6 text-lg">
              Administra la información de mascotas, historial médico y citas de manera rápida y confiable.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => onSelectTab("mascotas")}>Mascotas</Button>
              <Button onClick={() => onSelectTab("citas")} variant="outline">Citas</Button>
              <Button onClick={() => onSelectTab("medicamentos")} variant="secondary">Medicamentos</Button>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <img
              src="/BannerGatoPerro.png"
              alt="Veterinario"
              className=" w-72 md:w-96"
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-6 mt-10 fade-in-element">
          <div className="feature-card bg-green-50 p-6 rounded-xl shadow text-center hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold mb-2 text-green-700">Mascotas</h3>
            <p className="text-gray-600">Consulta historial y datos médicos de las mascotas.</p>
          </div>
          <div className="feature-card bg-yellow-50 p-6 rounded-xl shadow text-center hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold mb-2 text-yellow-700">Citas</h3>
            <p className="text-gray-600">Gestiona citas médicas de manera organizada.</p>
          </div>
          <div className="feature-card bg-blue-50 p-6 rounded-xl shadow text-center hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold mb-2 text-blue-700">Medicamentos</h3>
            <p className="text-gray-600">Revisa y actualiza medicamentos recetados.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default VeterinarioHome;
