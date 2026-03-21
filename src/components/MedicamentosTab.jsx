import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const API_URL = `${BASE_URL}/medicamentos`;

const MedicamentosTab = () => {
  const [showForm, setShowForm] = useState(false);
  const [medicamentos, setMedicamentos] = useState([]);
  const [editing, setEditing] = useState(null);

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    efectos: "",
    expiracion: "",
  });

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setMedicamentos(data));
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
      setMedicamentos(
        medicamentos.map((m) => (m.id === editing.id ? updated : m))
      );
    } else {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const nuevo = await res.json();
      setMedicamentos([...medicamentos, nuevo]);
    }

    setFormData({
      nombre: "",
      descripcion: "",
      precio: "",
      efectos: "",
      expiracion: "",
    });
    setEditing(null);
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setMedicamentos(medicamentos.filter((m) => m.id !== id));
  };

  const isEditing = !!editing;

  return (
    <div className="form-content flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Medicamentos</h2>
        {!showForm && (
          <Button
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setShowForm(true)}
          >
            <Plus className="w-4 h-4" />
            Agregar
          </Button>
        )}
      </div>

      {!showForm && (
        <div className="bg-white border p-4 rounded-xl shadow w-full">
          {medicamentos.length > 0 ? (
            <div className="flex flex-col gap-4">
              {medicamentos.map((m) => (
                <div
                  key={m.id}
                  className="border p-4 rounded-xl shadow-sm flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold text-lg">{m.nombre}</h3>
                    <p className="text-sm text-gray-600">{m.descripcion}</p>
                    <p className="text-sm text-gray-600">Precio: ${m.precio}</p>
                    <p className="text-sm text-gray-600">
                      Efectos secundarios: {m.efectos || "N/A"}
                    </p>
                    <p className="text-sm text-gray-600">Expira: {m.expiracion}</p>
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
            <p className="text-gray-500">No hay medicamentos registrados.</p>
          )}
        </div>
      )}

      {showForm && (
        <div className="bg-blue-50 border p-6 rounded-xl shadow w-full">
          <h2 className="text-lg font-semibold mb-4">
            {isEditing ? "Editar Medicamento" : "Nuevo Medicamento"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Nombre</Label>
              <Input
                disabled={isEditing}
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                required
              />
            </div>

            <div>
              <Label>Descripción</Label>
              <Input
                disabled={isEditing}
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                required
              />
            </div>

            <div>
              <Label>Precio</Label>
              <Input
                type="number"
                step="0.01"
                value={formData.precio}
                onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                required
              />
            </div>

            <div>
              <Label>Efectos Secundarios</Label>
              <Input
                value={formData.efectos}
                onChange={(e) => setFormData({ ...formData, efectos: e.target.value })}
              />
            </div>

            <div>
              <Label>Fecha de Expiración</Label>
              <Input
                disabled={isEditing}
                type="date"
                value={formData.expiracion}
                onChange={(e) => setFormData({ ...formData, expiracion: e.target.value })}
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit">{isEditing ? "Actualizar" : "Agregar"}</Button>
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

export default MedicamentosTab;
