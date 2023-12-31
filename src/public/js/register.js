const divProducts = document.getElementById('products-container')
const form = document.getElementById('formulario')
const first_name = document.getElementById('first_name')
const last_name = document.getElementById('last_name')
const email = document.getElementById('email')
const age = document.getElementById('age')
const password = document.getElementById('password')
const role = document.getElementById('role')



const resetForm = () => {
    first_name.value = ''
    last_name.value = ''
    email.value = ''
    age.value = ''
    password.value = ''
    role.value = ''

}


form.onsubmit = async (e) => {
    e.preventDefault();

    const user = {
        first_name: first_name.value,
        last_name: last_name.value,
        email: email.value,
        age: age.value,
        password: password.value,
        role: role.value
    };

    console.log("Datos enviados:", user);

    try {
        const response = await axios.post("http://localhost:8080/api/sessions/register", user);
        const data = response.data;

        if (data.result) {
            // Mostrar SweetAlert si el registro es exitoso
            Swal.fire({
                title: 'Registrado',
                text: '¡Registro exitoso! ¿Desea ir a la página de inicio de sesión?',
                icon: 'success',
                showCancelButton: true,
                confirmButtonText: 'Sí',
                cancelButtonText: 'No'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = 'http://localhost:8080/login'; // Redirige a la página de inicio de sesión
                } else {
                    resetForm();
                }
            });
        }
    } catch (error) {
        console.log(error);
        alert(error.response.data.error);
    }
};