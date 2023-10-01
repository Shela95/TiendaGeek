import { clientServices } from "../services/client-services.js";

const form = document.querySelector('[data-form-registro]');

form.addEventListener("submit", (eventosubmit) => {
   eventosubmit.preventDefault();

    const nombre = document.querySelector('[data-form-nombre]').value;
    const precio = document.querySelector('[data-form-precio]').value;
    const categoria = document.querySelector('[data-form-categoria]').value;
    const descripcion = document.querySelector('[data-form-descripcion]').value;
    const imagen = document.querySelector('[data-form-imagen]').value;

    clientServices.crearProducto(nombre, precio, imagen, categoria, descripcion)
    .then(() => {
      Swal.fire(
        'Perfecto!',
        'Producto Creado!',
        'success'
      )
      setTimeout(() =>{
        window.location.href = './admin.html';
      }, 2000)
    }).catch((err) => console.log(err));
});
