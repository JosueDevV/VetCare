import React, { useEffect } from "react";

const About = () => {
  useEffect(() => {

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
  }, []);

  return (
    <div className="about-page">
      <section className="page-header fade-in-element">
        <h1 className="page-title">Sobre Nosotros</h1>
        <p className="page-subtitle">
          Conoce más sobre Vetcare+, nuestra historia, nuestra filosofía de trabajo
          y el compromiso diario que tenemos con la salud, el bienestar y la calidad
          de vida de cada mascota que llega a nuestras manos.
        </p>
      </section>

      <section className="about-content">
        <div className="about-section fade-in-element" data-testid="about-mission">
          <div className="about-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l9.84-9.84a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <h2>Nuestra Misión</h2>
          <p>
            En Vetcare+ nos dedicamos a proporcionar atención veterinaria de la más alta
            calidad, combinando experiencia profesional, tecnología moderna y un trato
            cálido y personalizado. Nuestro objetivo es prevenir enfermedades, ofrecer
            diagnósticos oportunos y brindar tratamientos eficaces, siempre enfocados
            en mejorar la calidad de vida de cada mascota y la tranquilidad de su familia.
          </p>
        </div>

        <div className="about-section fade-in-element" data-testid="about-vision">
          <div className="about-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
          </div>
          <h2>Nuestra Visión</h2>
          <p>
            Ser la clínica veterinaria de referencia en la región, reconocida no solo por
            nuestra excelencia médica, sino también por nuestro trato humano y cercano.
            Buscamos liderar en innovación veterinaria, promover el cuidado responsable
            y contribuir activamente a una comunidad más consciente del bienestar animal.
          </p>
        </div>

        <div className="about-section fade-in-element" data-testid="about-values">
          <div className="about-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h2>Nuestros Valores</h2>
          <ul className="values-list">
            <li><strong>Compromiso:</strong> Nos involucramos en cada caso como si fuera propio.</li>
            <li><strong>Profesionalismo:</strong> Personal capacitado y en constante actualización.</li>
            <li><strong>Empatía:</strong> Entendemos el valor emocional que tiene cada mascota.</li>
            <li><strong>Integridad:</strong> Diagnósticos claros, tratamientos honestos y ética profesional.</li>
            <li><strong>Innovación:</strong> Uso de tecnología y métodos modernos para mejores resultados.</li>
          </ul>
        </div>
      </section>

      <section className="team-section fade-in-element">
        <h2 className="section-title">Nuestro Equipo</h2>
        <div className="team-grid">
          {[
            {
              name: "Dra. María González",
              role: "Directora Médica",
              desc: "15 años de experiencia liderando equipos veterinarios y garantizando calidad clínica.",
            },
            {
              name: "Dr. Carlos Rodríguez",
              role: "Especialista en Cirugía",
              desc: "Experto en cirugías complejas, ortopedia y procedimientos de alta precisión.",
            },
            {
              name: "Dra. Ana Martínez",
              role: "Especialista en Medicina Interna",
              desc: "Especializada en diagnóstico avanzado, prevención y seguimiento clínico.",
            },
          ].map((member, i) => (
            <div key={i} className="team-member" data-testid={`team-member-${i + 1}`}>
              <div className="member-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h3>{member.name}</h3>
              <p className="member-role">{member.role}</p>
              <p>{member.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="stats-section fade-in-element">
        <div className="stats-grid">
          <div className="stat-item" data-testid="stat-years">
            <div className="stat-number">10+</div>
            <div className="stat-label">Años brindando atención veterinaria responsable</div>
          </div>
          <div className="stat-item" data-testid="stat-patients">
            <div className="stat-number">5000+</div>
            <div className="stat-label">Mascotas atendidas con seguimiento profesional</div>
          </div>
          <div className="stat-item" data-testid="stat-satisfaction">
            <div className="stat-number">98%</div>
            <div className="stat-label">Familias satisfechas con nuestro servicio</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
