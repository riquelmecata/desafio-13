const socketClient = io()
const divProducts = document.getElementById('products-container')
const form = document.getElementById('formulario')
const category = document.getElementById('category')


const resetForm = () => {
    category.value = ''
}

socketClient.on('messages', messages => {
    console.log(messages)
    const messagesList = messages.map(msg => {

        return `
        <div class="card m-2" style="width: 18rem;">
       
        <div class="card-body">
            <h5 class="card-title">${msg.user}</h5>
       
            <p class="card-text">${msg.message}</p>
        
        </div>
    </div>
        `
    }).join(' ')
    divProducts.innerHTML = messagesList

})


form.onsubmit = (e) => {
    e.preventDefault()

    const product = {
        message: category.value,
    }

    socketClient.emit('newMsg', product)
    resetForm()
}