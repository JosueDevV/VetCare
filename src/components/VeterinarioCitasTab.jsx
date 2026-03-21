import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const API_CITAS = `${BASE_URL}/cites`;
export const API_CLIENTES = `${BASE_URL}/clientes`;
export const API_MASCOTAS = `${BASE_URL}/mascotas`;
export const API_SERVICIOS = `${BASE_URL}/servicios`;
export const API_EMPLEADOS = `${BASE_URL}/empleados`;

const VeterinarioCitasTab = () => {
  const [citas, setCitas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    fetch(API_CITAS).then(r => r.json()).then(setCitas);
    fetch(API_CLIENTES).then(r => r.json()).then(setClientes);
    fetch(API_MASCOTAS).then(r => r.json()).then(setMascotas);
    fetch(API_SERVICIOS).then(r => r.json()).then(setServicios);
    fetch(API_EMPLEADOS).then(r => r.json()).then(setEmpleados);
  }, []);

  const getCliente = id => clientes.find(c => c.id === id)?.name || "";
  const getMascota = id => mascotas.find(m => m.id === id)?.name || "";
  const getServicio = id => servicios.find(s => s.id === id)?.name || "";
  const getEmpleado = id => empleados.find(e => e.id === id)?.name || "";

  const hoy = new Date().toLocaleDateString("en-CA");

  const citasHoy = citas.filter(cita => {
    const fechaCita = new Date(cita.date).toLocaleDateString("en-CA");
    return fechaCita === hoy;
  });


  const darAlta = id => {
    if (window.confirm("¿Confirmas que esta cita ya fue atendida?")) {
      fetch(`${API_CITAS}/${id}/alta`, { method: "PUT" })
        .then(() => {
          setCitas(prev => prev.map(c => c.id === id ? { ...c, alta: 1 } : c));
        });
    }
  };

  return (
    <div className="form-content flex flex-col gap-6">
      <h2 className="text-xl font-semibold">Agenda de Citas</h2>

      <div className="bg-white border p-4 rounded-xl shadow w-full">
        {citasHoy.length ? citasHoy.map(cita => (
          <div
            key={cita.id}
            className={`border p-4 rounded-xl shadow-sm flex justify-between items-center ${cita.alta ? "bg-gray-100 opacity-50" : "hover:bg-blue-50"}`}
          >
            <div>
              <h3 className="font-semibold text-lg">
                {getMascota(cita.pet_id)} — {getCliente(cita.client_id)}
              </h3>
              <p>Servicio: {getServicio(cita.service_id)}</p>
              <p>Veterinario: {getEmpleado(cita.employee_id)}</p>
              <p>Fecha: {cita.date}</p>
              <p>Hora: {cita.time}</p>
              {cita.notes && <p>Notas: {cita.notes}</p>}
            </div>

            <Button
              size="sm"
              disabled={cita.alta}
              onClick={() => darAlta(cita.id)}
            >
              {cita.alta ? "Atendida" : "Dar de alta"}
            </Button>
          </div>
        )) : <p>No hay citas registradas hoy: {hoy}</p>}
      </div>
    </div>
  );
};

export default VeterinarioCitasTab;
