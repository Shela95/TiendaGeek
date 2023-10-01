import { clientServices } from '../services/client-services.js';
import { mostrarProducto } from '../controllers/mostrar-productos.js';

const autoctonas = document.querySelector('[data-fritanga]');
const jardin = document.querySelector('[data-harinas]');
console.log(jardin);
const variedades = document.querySelector('[data-carnes]');


clientServices.listaProductos().then(data => {
    data.forEach(({ nombre, precio, imagen, id, categoria, descripcion }) => {
        //mostrar en el index
        if (categoria === 'harinas') {
            const nuevoProducto = mostrarProducto(nombre, precio, imagen, id, categoria, descripcion);
            jardin.appendChild(nuevoProducto);
        } else if (categoria === 'fritanga') {
            const nuevoProducto = mostrarProducto(nombre, precio, imagen, id, categoria, descripcion);
            autoctonas.appendChild(nuevoProducto);
        } else if (categoria === 'carnes') {
            const nuevoProducto = mostrarProducto(nombre, precio, imagen, id, categoria, descripcion);
            variedades.appendChild(nuevoProducto);
        }
    })
})