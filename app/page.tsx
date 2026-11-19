"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { crearSolicitud } from "@/lib/model";

type Solicitud = ReturnType<typeof crearSolicitud>;
const clave = "mesapyme.solicitudes.v1";

function leer(): Solicitud[] {
  return JSON.parse(localStorage.getItem(clave) ?? "[]");
}

export default function Portal() {
  const [casos, setCasos] = useState<Solicitud[]>([]);
  const [mensaje, setMensaje] = useState("");
  useEffect(() => {
    try { setCasos(leer()); }
    catch { setMensaje("No se pudieron cargar las solicitudes guardadas."); }
  }, []);

  function registrar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const datos = new FormData(form);
    try {
      const anteriores = leer();
      const caso = crearSolicitud(String(datos.get("titulo")), String(datos.get("descripcion")),
        String(datos.get("categoria")), (anteriores[0]?.id ?? 0) + 1, new Date().toISOString());
      const nuevos = [caso, ...anteriores];
      localStorage.setItem(clave, JSON.stringify(nuevos));
      setCasos(nuevos);
      setMensaje("Solicitud #" + caso.id + " registrada.");
      form.reset();
    } catch (error) {
      setMensaje(error instanceof Error ? error.message : "No se pudo registrar la solicitud.");
    }
  }

  return <main>
    <h1>Mis solicitudes</h1>
    <p>Demostración local. Registra un caso con datos ficticios.</p>
    <section><h2>Nueva solicitud</h2>
      <form onSubmit={registrar}>
        <label>Asunto<input required name="titulo" maxLength={150} /></label>
        <label>Categoría<select name="categoria"><option>Accesos</option><option>Equipos</option></select></label>
        <label>Descripción<textarea required name="descripcion" maxLength={2000} rows={3} /></label>
        <Button type="submit">Registrar solicitud</Button>
      </form>
    </section>
    <p role="status">{mensaje}</p>
    <section><h2>Solicitudes registradas</h2>
      {casos.length === 0 && <p>Todavía no tienes solicitudes.</p>}
      {casos.map(caso => <details key={caso.id}>
        <summary>#{caso.id} · {caso.titulo} · {caso.estado}</summary>
        <p>{caso.categoria} · Prioridad {caso.prioridad}</p>
        <p>{new Date(caso.fecha).toLocaleString("es-CL")}<br />{caso.descripcion}</p>
      </details>)}
    </section>
  </main>;
}
