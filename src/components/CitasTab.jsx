import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const API_CITAS = `${BASE_URL}/cites`;
const API_CLIENTES = `${BASE_URL}/clientes`;
const API_MASCOTAS = `${BASE_URL}/mascotas`;
const API_EMPLEADOS = `${BASE_URL}/empleados`;
const API_SERVICIOS = `${BASE_URL}/servicios`;

const CitasTab = () => {
  const [showForm, setShowForm] = useState(false);
  const [citas, setCitas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [editing, setEditing] = useState(null);
  const [reagendando, setReagendando] = useState(false);

  const initialForm = {
    client_id: "",
    pet_id: "",
    service_id: "",
    employee_id: "",
    date: "",
    time: "",
    notes: ""
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    fetch(API_CITAS).then(res => res.json()).then(setCitas);
    fetch(API_CLIENTES).then(res => res.json()).then(setClientes);
    fetch(API_MASCOTAS).then(res => res.json()).then(setMascotas);
    fetch(API_EMPLEADOS).then(res => res.json()).then(setEmpleados);
    fetch(API_SERVICIOS).then(res => res.json()).then(setServicios);
  }, []);

  const closeFormAndReset = () => {
    setEditing(null);
    setReagendando(false);
    setFormData(initialForm);
    setShowForm(false);
  };

  const mascotasCliente = mascotas.filter(m => Number(m.client_id) === Number(formData.client_id));

  const generarHoras = () => {
    if (!formData.date) return [];
    const horas = [];
    let inicio = 540;
    let fin = new Date(formData.date + "T00:00").getDay() === 6 ? 840 : 1200;
    while (inicio <= fin) {
      const h = String(Math.floor(inicio / 60)).padStart(2, "0");
      const m = String(inicio % 60).padStart(2, "0");
      horas.push(`${h}:${m}`);
      inicio += 20;
    }
    return horas;
  };

  const hoy = new Date().toLocaleDateString("en-CA");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      ...formData,
      client_id: Number(formData.client_id),
      pet_id: Number(formData.pet_id),
      service_id: Number(formData.service_id),
      employee_id: Number(formData.employee_id)
    };

    if (editing) {
      const res = await fetch(`${API_CITAS}/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const updated = await res.json();
      setCitas(citas.map(c => (c.id === editing.id ? updated : c)));
    } else {
      const res = await fetch(API_CITAS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const nueva = await res.json();
      setCitas([nueva, ...citas]);
    }

    closeFormAndReset();
  };

  const handleDelete = async (id) => {
    await fetch(`${API_CITAS}/${id}`, { method: "DELETE" });
    setCitas(citas.filter(c => c.id !== id));
  };

  return (
    <div className="form-content flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Programar Citas</h2>
        <Button size="sm" onClick={() => {
          if (showForm) {
            closeFormAndReset();
          } else {
            setShowForm(true);
          }
        }}>
          <Plus className="w-4 h-4" />
          {showForm ? "Cerrar" : "Nueva Cita"}
        </Button>
      </div>

      {!showForm && (
        <div className="bg-white border p-4 rounded-xl shadow w-full space-y-3">
          {citas.length ? citas.map(cita => (
            <div key={cita.id} className="relative border p-4 rounded-xl shadow-sm flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">{cita.client_name} — {cita.pet_name}</h3>
                <p>Servicio: {cita.service_name}</p>
                <p>Veterinario: {cita.employee_name}</p>
                <p>Fecha: {cita.date?.split("T")[0]}</p>
                <p>Hora: {cita.time}</p>
                {cita.notes && <p className="text-sm text-gray-500 italic">{cita.notes}</p>}
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => {
                  setEditing(cita);
                  setReagendando(true);
                  setFormData({ ...cita, date: cita.date?.split("T")[0] || "", notes: cita.notes ?? "" });
                  setShowForm(true);
                }}>Reagendar</Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(cita.id)}>Cancelar</Button>
              </div>
            </div>
          )) : <p>No hay citas registradas.</p>}
        </div>
      )}

      {showForm && (
        <div className="bg-blue-50 border p-6 rounded-xl shadow w-full">
          <h2 className="text-lg font-semibold mb-4">{editing ? "Reagendar Cita" : "Programar Cita"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Cliente</Label><select disabled={editing} value={formData.client_id} onChange={e => setFormData({ ...formData, client_id: e.target.value, pet_id: "" })} required className="border p-2 rounded-md w-full"><option value="">Seleccionar cliente</option>{clientes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
              <div><Label>Mascota</Label><select disabled={editing} value={formData.pet_id} onChange={e => setFormData({ ...formData, pet_id: e.target.value })} required className="border p-2 rounded-md w-full"><option value="">Seleccionar mascota</option>{mascotasCliente.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}</select></div>
              <div><Label>Servicio</Label><select value={formData.service_id} onChange={e => setFormData({ ...formData, service_id: e.target.value })} required className="border p-2 rounded-md w-full"><option value="">Seleccionar servicio</option>{servicios.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select></div>
              <div><Label>Empleado</Label><select value={formData.employee_id} onChange={e => setFormData({ ...formData, employee_id: e.target.value })} required className="border p-2 rounded-md w-full"><option value="">Seleccionar empleado</option>{empleados.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}</select></div>
              <div><Label>Fecha</Label><Input type="date" min={hoy} onChange={e => setFormData({ ...formData, date: e.target.value, time: "" })} value={formData.date} required /></div>
              <div><Label>Hora</Label><select value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} required className="border p-2 rounded-md w-full"><option value="">Seleccionar hora</option>{generarHoras().map(h => <option key={h} value={h}>{h}</option>)}</select></div>
            </div>
            <div><Label>Notas</Label><Input value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} /></div>
            <div className="flex gap-2">
              <Button type="submit">{editing ? "Guardar Cambios" : "Crear Cita"}</Button>
              <Button variant="outline" type="button" onClick={closeFormAndReset}>Cancelar</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CitasTab;
