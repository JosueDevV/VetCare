import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const API_URL = `${BASE_URL}/servicios`;

const ServicesTab = () => {
  const [showForm, setShowForm] = useState(false);
  const [servicios, setServicios] = useState([]);
  const [editing, setEditing] = useState(null);

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
  });

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) =>
        setServicios(
          data.map((s) => ({
            id: s.id,
            nombre: s.name,
            descripcion: s.description,
            precio: s.price,
          }))
        )
      );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sendData = {
      name: formData.nombre,
      description: formData.descripcion,
      price: formData.precio,
    };

    if (editing) {
      const res = await fetch(`${API_URL}/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sendData),
      });

      const updated = await res.json();

      setServicios(
        servicios.map((s) =>
          s.id === editing.id
            ? {
              id: updated.id,
              nombre: updated.name,
              descripcion: updated.description,
              precio: updated.price,
            }
            : s
        )
      );
    } else {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sendData),
      });

      const nuevo = await res.json();

      setServicios([
        ...servicios,
        {
          id: nuevo.id,
          nombre: nuevo.name,
          descripcion: nuevo.description,
          precio: nuevo.price,
        },
      ]);
    }

    setFormData({ nombre: "", descripcion: "", precio: "" });
    setEditing(null);
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setServicios(servicios.filter((s) => s.id !== id));
  };

  const isEditing = !!editing;

  return (
    <div className="form-content flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Servicios</h2>
        {!showForm && (
          <Button
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setShowForm(true)}
          >
            <Plus className="w-4 h-4" />
            Agregar Servicio
          </Button>
        )}
      </div>

      {!showForm && (
        <div className="bg-white border p-4 rounded-xl shadow w-full">
          {servicios.length > 0 ? (
            <div className="flex flex-col gap-4">
              {servicios.map((s) => (
                <div
                  key={s.id}
                  className="border p-4 rounded-xl shadow-sm flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold text-lg">{s.nombre}</h3>
                    <p className="text-sm text-gray-600">{s.descripcion}</p>
                    <p className="text-sm text-gray-600">Precio: ${s.precio}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditing(s);
                        setFormData(s);
                        setShowForm(true);
                        window.scrollTo({
                          top: document.body.scrollHeight,
                          behavior: "smooth",
                        });
                      }}
                    >
                      Editar
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(s.id)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No hay servicios registrados.</p>
          )}
        </div>
      )}

      {showForm && (
        <div className="bg-violet-50 border p-6 rounded-xl shadow w-full">
          <h2 className="text-lg font-semibold mb-4">
            {isEditing ? "Editar Servicio" : "Nuevo Servicio"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Nombre</Label>
              <Input
                disabled={isEditing}
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label>Descripción</Label>
              <Input
                disabled={isEditing}
                value={formData.descripcion}
                onChange={(e) =>
                  setFormData({ ...formData, descripcion: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label>Precio</Label>
              <Input
                type="number"
                step="0.01"
                value={formData.precio}
                onChange={(e) =>
                  setFormData({ ...formData, precio: e.target.value })
                }
                required
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                {isEditing ? "Actualizar" : "Agregar Servicio"}
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  setEditing(null);
                  setShowForm(false);
                }}
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

export default ServicesTab;
