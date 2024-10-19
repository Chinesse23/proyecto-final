// initData.js
const mongoose = require('mongoose');
const Posada = require('./models/posadaModel');
const Actividad = require('./models/actividadModel');

const posadas = [
    { nombre: 'Posada Turpial', direccion: 'Calle 1', contacto: '123456789', informacion: 'Hermosa posada en la playa' },
    { nombre: 'Los Ranchos de Chano', direccion: 'Calle 2', contacto: '987654321', informacion: 'Posada rural con encanto' },
    { nombre: 'Posada Las Garcia', direccion: 'Calle 3', contacto: '456789123', informacion: 'Posada familiar con piscina' }
];

const actividades = [
    { nombre: 'Clases de Surf', fecha: new Date(), participantes: 10, descripcion: 'Clases de surf para todos los niveles' },
    { nombre: 'Clases de Yoga', fecha: new Date(), participantes: 15, descripcion: 'Clases de yoga al aire libre' },
    { nombre: 'Clases de Buceo', fecha: new Date(), participantes: 8, descripcion: 'Clases de buceo en aguas cristalinas' },
    { nombre: 'Clases de Cocina', fecha: new Date(), participantes: 12, descripcion: 'Clases de cocina local' }
];

async function initializeData() {
    try {
        await Posada.deleteMany({});
        await Actividad.deleteMany({});

        await Posada.insertMany(posadas);
        await Actividad.insertMany(actividades);

        console.log('Datos iniciales insertados correctamente');
    } catch (error) {
        console.error('Error al insertar datos iniciales:', error);
    }
}

module.exports = initializeData;
