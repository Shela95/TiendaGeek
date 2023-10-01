import { clientServices } from "../services/client-services.js";


let url = new URL(window.location);
let id = url.searchParams.get('id');
const obtenerInfoProducto = async () => {

    const nombre = document.querySelector("[data-form-nombre]");
    const precio = document.querySelector("[data-form-precio]");
    const categoria = document.querySelector("[data-form-categoria]");
    const descripcion = document.querySelector("[data-form-descripcion]");
    const imagen = document.querySelector("[data-form-imagen]");


    try {
        const producto = await clientServices.detalleProducto(id);
        console.log(producto);
        if (producto.nombre && producto.precio && producto.descripcion && producto.imagen && producto.categoria) {
            nombre.value = producto.nombre;
            precio.value = producto.precio;
            categoria.value = producto.categoria;
            descripcion.value = producto.descripcion;
            imagen.value = producto.imagen;
        }
    } catch (error) {
        console.log("catch error", error);
    }
}

obtenerInfoProducto();


const form = document.querySelector('[data-form-registro]');

form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nombre = document.querySelector("[data-form-nombre]").value;
    const precio = document.querySelector("[data-form-precio]").value;
    const categoria = document.querySelector("[data-form-categoria]").value;
    const descripcion = document.querySelector("[data-form-descripcion]").value;
    const imagen = document.querySelector("[data-form-imagen]").value;


    clientServices.actualizarProducto(nombre, precio, imagen, id, categoria, descripcion).then(() => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Producto editado',
            showConfirmButton: false,
            timer: 1500
        })
        setTimeout(function () {
            window.location.href = "./admin.html";
        }, 100000);
    })
})

