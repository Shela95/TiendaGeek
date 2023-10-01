import { clientServices } from "../services/client-services.js";
import { mostrarProductos } from "./controllers/mostrar-productos.js";



const titulo = document.querySelector('[data-titulo-busqueda]');
const resultado = document.querySelector('[data-productos-buscados]');

const productosBuscados = async () => {

    const url = new URL(window.location);
    const nombreBuscado = url.searchParams.get('texto')

    if (nombreBuscado === null) {
        console.log('No se encontro el producto');
    }

    const nombreBuscar = nombreBuscado.toLowerCase();

    let cantidadResultados = 0;

    clientServices.listaProductos().then(data => {
        data.forEach(({ nombre, precio, imagen, id, categoria, descripcion }) => {

            const nombreProducto = nombre.toLowerCase();
            const categoriaProducto = categoria.toLowerCase();
            const validar = nombreProducto.includes(nombreBuscar);
            const validarCategoria = categoriaProducto.includes(nombreBuscar);

            if (validar || validarCategoria) {
                const mostrarResultados = mostrarProductos(nombre, precio, imagen, id, categoria, descripcion);
                resultado.appendChild(mostrarResultados);
                cantidadResultados++;

            }
        });
        if (cantidadResultados == 0) {
            mensaje = `<h1 class="productos__head__titulo-principal">Resultados de busqueda</h1>`;
            titulo.innerHTML = mensaje;
        }
    }).catch(error => alert(error));

}

productosBuscados();