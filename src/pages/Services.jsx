import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch(`${API_URL}/servicios`);
      if (!res.ok) throw new Error("Error al obtener los servicios");

      const data = await res.json();
      setServices(data);
    } catch (error) {
      console.error("Error al obtener servicios:", error);
      toast.error("No se pudieron cargar los servicios desde el servidor");

      setServices([
        {
          id: "1",
          name: "Consulta General",
          description: "Revisión completa del estado de salud de tu mascota",
          price: 30,
          duration: "30 minutos",
        },
        {
          id: "2",
          name: "Vacunación",
          description: "Plan completo de vacunas según la edad y necesidades",
          price: 25,
          duration: "15 minutos",
        },
        {
          id: "3",
          name: "Cirugía",
          description: "Procedimientos quirúrgicos con anestesia segura",
          price: 200,
          duration: "2-4 horas",
        },
        {
          id: "4",
          name: "Estética y Baño",
          description: "Baño completo, corte de pelo y uñas",
          price: 20,
          duration: "1 hora",
        },
        {
          id: "5",
          name: "Urgencias",
          description: "Atención inmediata para emergencias veterinarias",
          price: 50,
          duration: "Variable",
        },
        {
          id: "6",
          name: "Desparasitación",
          description: "Tratamiento completo antiparasitario interno y externo",
          price: 15,
          duration: "20 minutos",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("fade-in-visible");
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".fade-in-element");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [loading]);

  return (
    <div className="services-page">
      <section className="page-header fade-in-element">
        <h1 className="page-title">Nuestros Servicios</h1>
        <p className="page-subtitle">
          Ofrecemos una amplia gama de servicios veterinarios para el cuidado integral de tu mascota
        </p>
      </section>

      <section className="services-content">
        {loading ? (
          <div className="loading-spinner" data-testid="loading-spinner">
            Cargando servicios...
          </div>
        ) : (
          <div className="services-list">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="service-detail-card fade-in-element"
                data-testid={`service-card-${index}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="service-header">
                  <h3>{service.name}</h3>
                  <span className="service-price-tag">${service.price}</span>
                </div>

                <p className="service-description">{service.description}</p>

                <div className="service-footer">
                  <span className="service-duration">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      width="16"
                      height="16"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    20 min
                  </span>
                  <Button
                    className="btn-service"
                    data-testid={`btn-book-${index}`}
                    onClick={() => toast.info(`Reservar: ${service.name}`)}
                  >
                    Reservar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="services-info fade-in-element">
        <div className="info-box">
          <h3>¿Por qué elegirnos?</h3>
          <ul>
            <li>Veterinarios certificados con amplia experiencia</li>
            <li>Equipamiento médico de última generación</li>
            <li>Atención personalizada para cada mascota</li>
            <li>Precios accesibles y planes de financiamiento</li>
            <li>Seguimiento post-consulta sin costo adicional</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Services;
