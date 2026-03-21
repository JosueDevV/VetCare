import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const API_URL = "http://localhost:3000";
const MAX_ATTEMPTS = 3;

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (attempts >= MAX_ATTEMPTS) {
      toast.error("Has excedido el número máximo de intentos. Redirigiendo...");
      navigate("/");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (!res.ok) {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        if (newAttempts >= MAX_ATTEMPTS) {
          toast.error("Demasiados intentos fallidos. Redirigiendo a la página principal.");
          navigate("/");
          return;
        } else {
          toast.error(`${data.detail || "Credenciales incorrectas"} (Intento ${newAttempts} de ${MAX_ATTEMPTS})`);
        }

        return;
      }

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userData", JSON.stringify(data.user));
      toast.success("Bienvenido, " + data.user.username);

      const role = data.user.role_id;

      if (role === 1) {
        navigate("/admin");
      } else if (role === 2) {
        navigate("/recepcion");
      } else if (role === 3) {
        navigate("/veterinario");
      } else {
        toast.error("Rol desconocido");
      }

    } catch (err) {
      toast.error("Error en el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Acceso Administrativo</h1>
          <p>Ingresa tus credenciales</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <Label>Usuario</Label>
            <Input
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Ingresa tu usuario"
              required
            />
          </div>

          <div className="form-group">
            <Label>Contraseña</Label>
            <Input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Ingresando..." : "Iniciar Sesión"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
