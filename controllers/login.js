

//escuchar por submit
const btn = document.querySelector('#btn-login');
btn.addEventListener('click', (e) => {
    e.preventDefault();
    loginUsuario();
})


//capturar la informacion del usuario
const loginUsuario = () => {
    const usuario = document.querySelector('[data-form-usuario]').value;
    const password = document.querySelector('[data-form-password]').value;
    let user = 'admin';
    let pass = 'admin123';

    if (usuario === user && password === pass) {

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Login Exitoso',
            showConfirmButton: false,
            timer: 1500
        })
        setTimeout(function () {
            window.location.href = "/views/admin.html";
        }, 2000);
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Datos incorrectos',
        })

    }
}