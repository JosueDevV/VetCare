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
    notes: "",
    motivo: ""
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    fetch(API_CITAS).then(res => res.json()).then(setCitas);
    fetch(API_CLIENTES).then(res => res.json()).then(setClientes);
    fetch(API_MASCOTAS).then(res => res.json()).then(setMascotas);
    fetch(API_EMPLEADOS).then(res => res.json()).then(setEmpleados);
    fetch(API_SERVICIOS).then(res => res.json()).then(setServicios);
  }, []);

  const mascotasCliente = mascotas.filter(m => Number(m.client_id) === Number(formData.client_id));

  const esSabado = date => new Date(date + "T00:00").getDay() === 6;

  const generarHoras = () => {
    if (!formData.date) return [];
    const horas = [];
    let inicio = 540;
    let fin = esSabado(formData.date) ? 840 : 1200;
    while (inicio <= fin) {
      const h = String(Math.floor(inicio / 60)).padStart(2, "0");
      const m = String(inicio % 60).padStart(2, "0");
      horas.push(`${h}:${m}`);
      inicio += 20;
    }
    return horas;
  };

  const hoy = new Date().toLocaleDateString("en-CA");
  const max = (() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 6);
    return d.toLocaleDateString("en-CA");
  })();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editing && formData.motivo.trim() === "") {
      alert("Debes ingresar el motivo del cambio");
      return;
    }

    if (new Date(formData.date + "T00:00") < new Date(hoy + "T00:00")) {
      alert("La fecha no puede ser menor a hoy");
      return;
    }

    const body = {
      ...formData,
      client_id: Number(formData.client_id),
      pet_id: Number(formData.pet_id),
      service_id: Number(formData.service_id),
      employee_id: Number(formData.employee_id)
    };

    let res;
    if (editing) {
      res = await fetch(`${API_CITAS}/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const updated = await res.json();
      const formatted = {
        ...updated,
        client_id: Number(updated.client_id),
        pet_id: Number(updated.pet_id),
        service_id: Number(updated.service_id),
        employee_id: Number(updated.employee_id)
      };
      setCitas(citas.map(c => (c.id === editing.id ? formatted : c)));
    } else {
      res = await fetch(API_CITAS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const nueva = await res.json();
      const nuevaFormateada = {
        ...nueva,
        client_id: Number(nueva.client_id),
        pet_id: Number(nueva.pet_id),
        service_id: Number(nueva.service_id),
        employee_id: Number(nueva.employee_id)
      };
      setCitas([...citas, nuevaFormateada]);
    }

    setFormData(initialForm);
    setEditing(null);
    setReagendando(false);
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_CITAS}/${id}`, { method: "DELETE" });
    setCitas(citas.filter(c => c.id !== id));
  };

  const getCliente = id => clientes.find(c => Number(c.id) === Number(id))?.name || "";
  const getMascota = id => mascotas.find(m => Number(m.id) === Number(id))?.name || "";
  const getEmpleado = id => empleados.find(e => Number(e.id) === Number(id))?.name || "";
  const getServicio = id => servicios.find(s => Number(s.id) === Number(id))?.name || "";

  return (
    <div className="form-content flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Programar Citas</h2>
        <Button size="sm" onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4" />
          {showForm ? "Cerrar" : "Nueva Cita"}
        </Button>
      </div>

      {!showForm && (
        <div className="bg-white border p-4 rounded-xl shadow w-full space-y-3">
          {citas.length ? citas.map(cita => (
            <div key={cita.id} className={`relative border p-4 rounded-xl shadow-sm flex justify-between items-center ${cita.alta ? "bg-gray-100 opacity-60" : ""}`}>
              <div>
                <h3 className="font-semibold text-lg">{getCliente(cita.client_id)} — {getMascota(cita.pet_id)}</h3>
                <p>Servicio: {getServicio(cita.service_id)}</p>
                <p>Veterinario: {getEmpleado(cita.employee_id)}</p>
                <p>Fecha: {cita.date?.split("T")[0]}</p>
                <p>Hora: {cita.time}</p>
                {cita.notes && <p className="text-sm text-gray-500 italic">{cita.notes}</p>}
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" disabled={cita.alta} onClick={() => {
                  setEditing(cita);
                  setReagendando(true);
                  setFormData({ ...cita, date: cita.date?.split("T")[0] || "", notes: cita.notes ?? "", motivo: "" });
                  setShowForm(true);
                }}>Reagendar</Button>
                <Button size="sm" variant="destructive" disabled={cita.alta} onClick={() => handleDelete(cita.id)}>Cancelar</Button>
              </div>
            </div>
          )) : <p>No hay citas registradas.</p>}
        </div>
      )}

      {showForm && (
        <div className="bg-blue-50 border p-6 rounded-xl shadow w-full">
          <h2 className="text-lg font-semibold mb-4">{reagendando ? "Reagendar Cita" : editing ? "Editar Cita" : "Programar Cita"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><Label>Cliente</Label><select disabled={reagendando} value={formData.client_id} onChange={e => setFormData({ ...formData, client_id: e.target.value, pet_id: "" })} required className="border p-2 rounded-md w-full"><option value="">Seleccionar cliente</option>{clientes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
              <div><Label>Mascota</Label><select disabled={reagendando} value={formData.pet_id} onChange={e => setFormData({ ...formData, pet_id: e.target.value })} required className="border p-2 rounded-md w-full"><option value="">Seleccionar mascota</option>{mascotasCliente.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}</select></div>
              <div><Label>Servicio</Label><select disabled={reagendando} value={formData.service_id} onChange={e => setFormData({ ...formData, service_id: e.target.value })} required className="border p-2 rounded-md w-full"><option value="">Seleccionar servicio</option>{servicios.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select></div>
              <div><Label>Empleado</Label><select disabled={reagendando} value={formData.employee_id} onChange={e => setFormData({ ...formData, employee_id: e.target.value })} required className="border p-2 rounded-md w-full"><option value="">Seleccionar empleado</option>{empleados.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}</select></div>
              <div><Label>Fecha</Label><Input type="date" min={hoy} max={max} onChange={e => setFormData({ ...formData, date: e.target.value, time: "" })} value={formData.date} required /></div>
              <div><Label>Hora</Label><select value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} required className="border p-2 rounded-md w-full"><option value="">Seleccionar hora</option>{generarHoras().map(h => <option key={h} value={h}>{h}</option>)}</select></div>
            </div>
            <div><Label>Notas</Label><Input value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} /></div>
            {(editing || reagendando) && <div><Label>Motivo</Label><textarea className="border p-2 rounded-md w-full" rows="3" value={formData.motivo} onChange={e => setFormData({ ...formData, motivo: e.target.value })} /></div>}
            <div className="flex gap-2">
              <Button type="submit">{reagendando ? "Guardar" : "Crear Cita"}</Button>
              <Button variant="outline" type="button" onClick={() => { setEditing(null); setReagendando(false); setFormData(initialForm); setShowForm(false); }}>Cancelar</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CitasTab;
