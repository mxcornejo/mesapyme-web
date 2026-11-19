import test from 'node:test';
import assert from 'node:assert/strict';
import { crearSolicitud } from './public/model.js';
test('El alta normaliza el asunto e inicia el caso con prioridad media', () => {
  const caso = crearSolicitud(' Correo ', 'Acceso bloqueado', 'Accesos', 1, '2026-11-19');
  assert.deepEqual([caso.titulo, caso.estado, caso.prioridad], ['Correo', 'Nueva', 'Media']);
});
test('El formulario rechaza espacios vacíos y categorías desconocidas', () => {
  assert.throws(() => crearSolicitud('   ', 'Detalle', 'Accesos'));
  assert.throws(() => crearSolicitud('Correo', 'Detalle', 'Servicios'));
});
