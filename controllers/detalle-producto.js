import { clientServices } from "../services/client-services.js";
import { mostrarProducto } from "./mostrar-productos.js";



const obtenerInformacion = async () => {

    const url = new URL(window.location);
    const id = url.searchParams.get('id');

    if (id === null) {
        alert('hubo un error al caragar el producto')
    }

    try {
        //consultamos los detalles del producto solicitado
        const producto = await clientServices.detalleProducto(id)

        //validamos que el objeto contenga las siguientes propiedades
        if (producto.nombre && producto.precio && producto.descripcion && producto.imagen) {

            //creamos el card
            const contenedor = document.querySelector('[data-detalle-producto]');

            const contenido = `
            <img class="producto__imagen--detalle" src="${producto.imagen}">
            <div class="detalles__info">
                <h3 class="producto__titulo">${producto.nombre}</h3>
                <p class="producto__precio">$${producto.precio}</p>
                <p class="producto__descripcion">${producto.descripcion}
                </p>
            </div>`;

            //mostramos prodcto en el html
            contenedor.innerHTML = contenido;

            //enlistar productos similares
            const productosSimilares = document.querySelector('[data-productos-similares');
            const idProducto = producto.id;
            const categoriaActual = producto.categoria;

            clientServices.listaProductos().then(data => {
                data.forEach(({ nombre, precio, imagen, id, categoria, descripcion }) => {

                    if (idProducto !== id && categoriaActual === categoria) {
                        const nuevoProducto = mostrarProducto(nombre, precio, imagen, id, categoria, descripcion);
                        productosSimilares.appendChild(nuevoProducto);
                    }
                }).catch(error => console.log('Hubo un error inesperado'));
            })
        } else {
            throw new error();
        }
    } catch (error) {
        console.log('Ocurrio un error inesperado');
    }
};

obtenerInformacion();