export function crearSolicitud(titulo, descripcion, categoria, id, fecha) {
  titulo = titulo.trim();
  descripcion = descripcion.trim();
  if (!titulo || !descripcion || titulo.length > 150 || descripcion.length > 2000)
    throw new Error('Ingresa un asunto y una descripción válidos.');
  if (!['Accesos', 'Equipos'].includes(categoria)) throw new Error('Categoría inválida.');
  return { id, titulo, descripcion, categoria, fecha, estado: 'Nueva', prioridad: 'Media' };
}
