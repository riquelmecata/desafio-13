const divProducts = document.getElementById('products-container')
const form = document.getElementById('formulario')
const email = document.getElementById('email')
const contraseña = document.getElementById('contraseña')



const resetForm = () => {
    email.value = ''
    contraseña.value = ''
}

form.onsubmit = async (e) => {
    e.preventDefault();

    const user = {
        email: email.value,
        password: contraseña.value,
    };

    try {
        const { data } = await axios.post("http://localhost:8080/api/sessions/login", user);
        console.log(data)
        /*
        window.location.replace('http://localhost:8080/products')
        */

        if (data.role && data.role.toLowerCase() === 'admin') {
            window.location.replace('http://localhost:8080/chat');
        } else {
            window.location.replace('http://localhost:8080/products');
        }
                 
        
        resetForm();
    } catch (error) {
        console.log(error);
        alert(error.response.data.error);
    }
};
