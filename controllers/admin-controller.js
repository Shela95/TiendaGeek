import { clientServices } from "../services/client-services.js"

const productos = document.querySelector('[data-admin-productos]');

const mostrarProductosAdmin = (nombre, precio, imagen, id, categoria, descripcion) => {

    const contenedor = document.createElement("div");
    const contenido = `
            <div class="producto__card__imagen" style="background-Image: url(${imagen})">
            <a class="boton-eliminar" id="${id}" href="#"><img src="../assets/images/eliminar-boton.svg" alt="boton eliminar"></a>
            <a class="boton-editar" href="../views/actualizar-producto.html?id=${id}"><img src="../assets/images/editar-boton.svg" alt="boton editar"></a>
            </div>
            <h3 class="producto__card__titulo">${nombre}</h3>
            <p class="producto__card__precio">$${precio}</p>
            <p class="producto__card__titulo"></p>`
        ;
    contenedor.innerHTML = contenido;

    const btnEliminar = contenedor.querySelector('.boton-eliminar');


    btnEliminar.addEventListener("click", () => {
        const id = btnEliminar.id;
        Swal.fire({
            title: 'Estas seguro?',
            text: `Quieres eliminar el producto: ${nombre} ? esta accion no es revertible!`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminarlo!'
        }).then(resultado => {
            if (resultado.isConfirmed) {
                clientServices.eliminarProducto(id)
                    .then(respuesta => {
                        console.log(respuesta);
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'El producto ha sido eliminado',
                            showConfirmButton: false,
                            timer: 2000 // Ajusta el valor del temporizador a 5000 milisegundos (5 segundos) o el valor deseado
                        });
                        setTimeout(() => {
                            const limpiaContenido = ``;
                            productos.innerHTML = limpiaContenido;
                            imprimirProductos();
                        }, 2000);
                    })
                    .catch(error => {
                        alert("Ocurrió un error al momento de eliminar");
                    });
            }
        });
    });
    
    return contenedor;
}

//volver a mostrar el contenido actualizado
const productosAdmin = document.querySelector('[data-admin-productos]');

const imprimirProductos = () => {
    clientServices.listaProductos()
        .then(data => {
            data.forEach(({ nombre, precio, imagen, id, categoria, descripcion }) => {
                const nuevoProducto = mostrarProductosAdmin(nombre, precio, imagen, id, categoria, descripcion);
                productosAdmin.appendChild(nuevoProducto);
            });
        })
        .catch(error => alert("ocurrio un error"));
}

imprimirProductos();

export const adminControler = {
    mostrarProductosAdmin
}