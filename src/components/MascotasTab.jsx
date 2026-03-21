import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const API_URL = `${BASE_URL}/mascotas`;
const SPECIES_URL = `${BASE_URL}/especies`;
const CLIENTS_URL = `${BASE_URL}/clientes`;

const MascotasTab = () => {
  const [showForm, setShowForm] = useState(false);
  const [mascotas, setMascotas] = useState([]);
  const [species, setSpecies] = useState([]);
  const [clients, setClients] = useState([]);
  const [editing, setEditing] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    species_id: "",
    breed: "",
    age: "",
    client_id: "",
  });

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setMascotas(data));

    fetch(SPECIES_URL)
      .then((res) => res.json())
      .then((data) => setSpecies(data));

    fetch(CLIENTS_URL)
      .then((res) => res.json())
      .then((data) => setClients(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editing) {
      const res = await fetch(`${API_URL}/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const updated = await res.json();

      setMascotas(mascotas.map((m) => (m.id === editing.id ? updated : m)));
    } else {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const nuevo = await res.json();
      setMascotas([...mascotas, nuevo]);
    }

    setFormData({
      name: "",
      species_id: "",
      breed: "",
      age: "",
      client_id: "",
    });
    setEditing(null);
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setMascotas(mascotas.filter((m) => m.id !== id));
  };

  const getSpeciesName = (id) =>
    species.find((s) => s.id === Number(id))?.name || "Sin especie";
  const getClientName = (id) =>
    clients.find((c) => c.id === Number(id))?.name || "Sin dueño";

  const isEditing = !!editing;

  return (
    <div className="form-content flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Lista de Mascotas</h2>

        <Button
          size="sm"
          className="flex items-center gap-2"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus className="w-4 h-4" />
          {showForm ? "Cerrar" : "Agregar Mascota"}
        </Button>
      </div>

      {!showForm && (
        <div className="bg-white border p-4 rounded-xl shadow w-full">
          {mascotas.length > 0 ? (
            <div className="flex flex-col gap-4">
              {mascotas.map((m) => (
                <div
                  key={m.id}
                  className="border p-4 rounded-xl shadow-sm flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold text-lg">{m.name}</h3>
                    <p className="text-sm text-gray-600">
                      {getSpeciesName(m.species_id)} - {m.breed}
                    </p>
                    <p className="text-sm text-gray-600">Edad: {m.age}</p>
                    <p className="text-sm text-gray-600">Dueño: {getClientName(m.client_id)}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditing(m);
                        setFormData(m);
                        setShowForm(true);
                        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
                      }}
                    >
                      Editar
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(m.id)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No hay mascotas registradas.</p>
          )}
        </div>
      )}

      {showForm && (
        <div className="bg-pink-50 border p-6 rounded-xl shadow w-full">
          <h2 className="text-lg font-semibold mb-4">
            {isEditing ? "Editar Mascota" : "Nueva Mascota"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Nombre</Label>
              <Input
                disabled={isEditing}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <Label>Especie</Label>
              <select
                disabled={isEditing}
                value={formData.species_id}
                onChange={(e) => setFormData({ ...formData, species_id: e.target.value })}
                required
                className="border border-gray-300 p-2 rounded-md w-full bg-white"
              >
                <option value="">Seleccionar especie</option>
                {species.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div>
              <Label>Raza</Label>
              <Input
                value={formData.breed}
                onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                required
              />
            </div>

            <div>
              <Label>Edad</Label>
              <Input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                required
              />
            </div>

            <div>
              <Label>Dueño</Label>
              <select
                disabled={isEditing}
                value={formData.client_id}
                onChange={(e) => setFormData({ ...formData, client_id: e.target.value })}
                required
                className="border border-gray-300 p-2 rounded-md w-full bg-white"
              >
                <option value="">Seleccionar dueño</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              <Button type="submit">{isEditing ? "Actualizar" : "Agregar Mascota"}</Button>
              <Button
                variant="outline"
                type="button"
                onClick={() => { setEditing(null); setShowForm(false); }}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MascotasTab;
