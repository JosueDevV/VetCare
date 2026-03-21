import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Home = () => {
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
    <div className="home-page">
      <section className="hero-section" data-testid="hero-section">
        <div className="hero-content">
          <div className="hero-text fade-in-element">
            <h1 className="hero-title">
              Cuidado Profesional
              <br />
              <span className="hero-highlight">Para Tu Mascota</span>
            </h1>
            <p className="hero-description">
              Brindamos servicios veterinarios de calidad con amor y dedicación.
              Tu mascota merece lo mejor.
            </p>
            <div className="hero-buttons">
              <Link to="/servicios">
                <Button className="btn-primary" data-testid="btn-services">
                  Ver Servicios
                </Button>
              </Link>
              <Link to="/nosotros">
                <Button
                  variant="outline"
                  className="btn-secondary"
                  data-testid="btn-about"
                >
                  Conocer Más
                </Button>
              </Link>
            </div>
          </div>

          <div className="hero-image fade-in-element">
            <div className="pet-animation">
              <img
                src="https://customer-assets.emergentagent.com/job_pet-clinic-web/artifacts/fk2jky72_p.png"
                alt="Mascota veterinaria"
                className="pet-image"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="features-grid">
          <div
            className="feature-card fade-in-element"
            data-testid="feature-emergency"
          >
            <div className="feature-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <h3>Atención 24/7</h3>
            <p>Disponibles para emergencias las 24 horas del día</p>
          </div>

          <div
            className="feature-card fade-in-element"
            data-testid="feature-professional"
          >
            <div className="feature-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h3>Profesionales</h3>
            <p>Equipo veterinario altamente calificado y experimentado</p>
          </div>

          <div
            className="feature-card fade-in-element"
            data-testid="feature-equipment"
          >
            <div className="feature-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h3>Equipamiento</h3>
            <p>Instalaciones modernas con tecnología de punta</p>
          </div>
        </div>
      </section>
    </div>
  )
}
