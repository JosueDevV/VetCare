import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const API_URL = `${BASE_URL}/empleados`;
const ROLES_URL = `${BASE_URL}/roles`;

const EmpleadosTab = () => {
  const [showForm, setShowForm] = useState(false);
  const [empleados, setEmpleados] = useState([]);
  const [roles, setRoles] = useState([]);
  const [editing, setEditing] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    middle_name: "",
    phone: "",
    email: "",
    salary: "",
    role_id: "",
  });

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setEmpleados(data));

    fetch(ROLES_URL)
      .then((res) => res.json())
      .then((data) => setRoles(data));
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

      setEmpleados(
        empleados.map((emp) =>
          emp.id === editing.id ? updated : emp
        )
      );
    } else {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const nuevo = await res.json();
      setEmpleados([...empleados, nuevo]);
    }

    setFormData({
      name: "",
      last_name: "",
      middle_name: "",
      phone: "",
      email: "",
      salary: "",
      role_id: "",
    });
    setEditing(null);
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setEmpleados(empleados.filter((emp) => emp.id !== id));
  };

  const getRoleName = (id) => {
    const role = roles.find((r) => r.id === Number(id));
    return role ? role.name : "Sin rol";
  };

  const isEditing = !!editing;

  return (
    <div className="form-content flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Lista de Empleados</h2>

        <Button
          size="sm"
          className="flex items-center gap-2"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus className="w-4 h-4" />
          {showForm ? "Cerrar" : "Agregar Empleado"}
        </Button>
      </div>

      {!showForm && (
        <div className="bg-white border p-4 rounded-xl shadow w-full">
          {empleados.length > 0 ? (
            <div className="flex flex-col gap-4">
              {empleados.map((emp) => (
                <div
                  key={emp.id}
                  className="border p-4 rounded-xl shadow-sm flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold text-lg">
                      {emp.name} {emp.last_name} {emp.middle_name}
                    </h3>
                    <p className="text-sm text-gray-600">Tel: {emp.phone}</p>
                    <p className="text-sm text-gray-600">Email: {emp.email}</p>
                    <p className="text-sm text-gray-600">Salario: ${emp.salary}</p>
                    <p className="text-sm text-gray-600">Rol: {getRoleName(emp.role_id)}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditing(emp);
                        setFormData(emp);
                        setShowForm(true);
                        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
                      }}
                    >
                      Editar
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(emp.id)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No hay empleados registrados.</p>
          )}
        </div>
      )}

      {showForm && (
        <div className="bg-amber-50 border p-6 rounded-xl shadow w-full">
          <h2 className="text-lg font-semibold mb-4">
            {isEditing ? "Editar Empleado" : "Nuevo Empleado"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <Label>Apellido paterno</Label>
                <Input
                  disabled={isEditing}
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label>Apellido materno</Label>
                <Input
                  disabled={isEditing}
                  value={formData.middle_name}
                  onChange={(e) => setFormData({ ...formData, middle_name: e.target.value })}
                />
              </div>

              <div>
                <Label>Teléfono</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <Label>Salario</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                />
              </div>

              <div>
                <Label>Rol</Label>
                <select
                  disabled={isEditing}
                  value={formData.role_id}
                  onChange={(e) => setFormData({ ...formData, role_id: e.target.value })}
                  required
                  className="border border-gray-300 p-2 rounded-md w-full bg-white"
                >
                  <option value="">Seleccionar rol</option>
                  {roles.map((r) => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit">{isEditing ? "Actualizar" : "Crear Empleado"}</Button>
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

export default EmpleadosTab;
