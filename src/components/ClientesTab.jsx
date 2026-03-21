import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

const BASE_URL = "https://vetcareapi-production-7fc8.up.railway.app";

const API_URL = `${BASE_URL}/clientes`;

const ClientesTab = () => {
  const [showForm, setShowForm] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [editingCliente, setEditingCliente] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setClientes(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingCliente) {
      const res = await fetch(`${API_URL}/${editingCliente.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const updated = await res.json();

      setClientes(
        clientes.map((c) =>
          c.id === editingCliente.id ? updated : c
        )
      );
    } else {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const nuevo = await res.json();
      setClientes([...clientes, nuevo]);
    }

    setFormData({ name: "", phone: "", email: "" });
    setEditingCliente(null);
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setClientes(clientes.filter((c) => c.id !== id));
  };

  return (
    <div className="form-content flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Lista de Clientes</h2>
        <Button
          size="sm"
          className="flex items-center gap-2"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus className="w-4 h-4" />
          {showForm ? "Cerrar" : "Nuevo Cliente"}
        </Button>
      </div>

      {!showForm && (
        <div className="bg-white border p-4 rounded-xl shadow w-full">
          {clientes.length > 0 ? (
            <div className="flex flex-col gap-4">
              {clientes.map((cliente) => (
                <div
                  key={cliente.id}
                  className="border p-4 rounded-xl shadow-sm flex justify-between items-center"
                >
                  <div className="w-full">
                    <h3 className="font-semibold text-lg">{cliente.name}</h3>
                    <p className="text-sm text-gray-600">Tel: {cliente.phone}</p>
                    <p className="text-sm text-gray-600">{cliente.email}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingCliente(cliente);
                        setFormData(cliente);
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
                      onClick={() => handleDelete(cliente.id)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No hay clientes registrados aún.</p>
          )}
        </div>
      )}

      {showForm && (
        <div className="bg-pink-50 border p-6 rounded-xl shadow w-full">
          <h2 className="text-lg font-semibold mb-4">
            {editingCliente ? "Editar Cliente" : "Nuevo Cliente"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Nombre</Label>
              <Input
                disabled={!!editingCliente}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label>Teléfono</Label>
              <Input
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                {editingCliente ? "Actualizar" : "Crear Cliente"}
              </Button>

              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  setEditingCliente(null);
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

export default ClientesTab;
