import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const API_URL = `${BASE_URL}/usuarios`;

const ROLES = [
  { id: 1, name: "Admin" },
  { id: 2, name: "Veterinario" },
  { id: 3, name: "Recepcionista" },
];

const UsuariosTab = () => {
  const [showForm, setShowForm] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [editing, setEditing] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role_id: "",
  });

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setUsuarios(data));
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
      setUsuarios(
        usuarios.map((u) => (u.id === editing.id ? updated : u))
      );
    } else {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const nuevo = await res.json();
      setUsuarios([...usuarios, nuevo]);
    }

    setFormData({ username: "", password: "", role_id: "" });
    setEditing(null);
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setUsuarios(usuarios.filter((u) => u.id !== id));
  };

  const getRoleName = (id) => {
    const role = ROLES.find((r) => r.id === Number(id));
    return role ? role.name : "Sin rol";
  };

  const isEditing = !!editing;

  return (
    <div className="form-content flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Usuarios</h2>
        {!showForm && (
          <Button
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setShowForm(true)}
          >
            <Plus className="w-4 h-4" />
            Agregar Usuario
          </Button>
        )}
      </div>

      {!showForm && (
        <div className="bg-white border p-4 rounded-xl shadow w-full">
          {usuarios.length > 0 ? (
            <div className="flex flex-col gap-4">
              {usuarios.map((u) => (
                <div
                  key={u.id}
                  className="border p-4 rounded-xl shadow-sm flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold text-lg">{u.username}</h3>
                    <p className="text-sm text-gray-600">Rol: {getRoleName(u.role_id)}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditing(u);
                        setFormData(u);
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
                      onClick={() => handleDelete(u.id)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No hay usuarios registrados.</p>
          )}
        </div>
      )}

      {showForm && (
        <div className="bg-blue-50 border p-6 rounded-xl shadow w-full">
          <h2 className="text-lg font-semibold mb-4">
            {isEditing ? "Editar Usuario" : "Nuevo Usuario"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Nombre de usuario</Label>
              <Input
                disabled={isEditing}
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label>Contraseña</Label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label>Rol</Label>
              <select
                disabled={isEditing}
                value={formData.role_id}
                onChange={(e) =>
                  setFormData({ ...formData, role_id: e.target.value })
                }
                required
                className="border border-gray-300 p-2 rounded-md w-full bg-white"
              >
                <option value="">Seleccionar rol</option>
                {ROLES.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              <Button type="submit">{isEditing ? "Actualizar" : "Crear Usuario"}</Button>
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

export default UsuariosTab;
