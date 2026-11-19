import { crearSolicitud } from './model.js';
const clave = 'mesapyme.solicitudes.v1';
const form = document.querySelector('form');
const estado = document.querySelector('[role=status]');
const leer = () => JSON.parse(localStorage.getItem(clave) || '[]');
function mostrar() {
  const lista = document.querySelector('#lista');
  lista.replaceChildren();
  const casos = leer();
  if (!casos.length) lista.textContent = 'Todavía no tienes solicitudes.';
  for (const caso of casos) {
    const detalle = document.createElement('details');
    const resumen = document.createElement('summary');
    resumen.textContent = '#' + caso.id + ' · ' + caso.titulo + ' · ' + caso.estado;
    const texto = document.createElement('p');
    texto.textContent = [caso.categoria + ' · Prioridad ' + caso.prioridad, new Date(caso.fecha).toLocaleString('es-CL'), caso.descripcion].join('\n');
    detalle.append(resumen, texto);
    lista.append(detalle);
  }
}
form.addEventListener('submit', event => {
  event.preventDefault();
  try {
    const casos = leer();
    const datos = new FormData(form);
    const caso = crearSolicitud(datos.get('titulo'), datos.get('descripcion'), datos.get('categoria'), (casos[0]?.id || 0) + 1, new Date().toISOString());
    localStorage.setItem(clave, JSON.stringify([caso, ...casos]));
    form.reset();
    mostrar();
    estado.textContent = 'Solicitud #' + caso.id + ' registrada.';
  } catch (error) { estado.textContent = error.message; }
});
mostrar();
