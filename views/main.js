const socket = io.connect();

function render(data) {
    const html = data.map((products, index) => {
        return(`
        <tr>
            <td>-${products.name}</td>
            <td>${products.price}</td>
            <td><img style="width: 30px; height: 30px;" src=${products.url}%> ></td>
            <td><button type="button" class="btn btn-warning">X</button></td>
        </tr>`)
    }).join(" ");
    document.getElementById('products').innerHTML = html;
}

function addProductoNuevo(e) {
    const newPrdoucto = {
        nombre: document.getElementById('nombre').value,
        precio: document.getElementById('precio').value,
        url: document.getElementById('url').value
    };
    socket.emit('nuevo-producto', newPrdoucto);
    return false;
}
socket.on('products', data => {
    render(data);
})

// <---MENSAJERÍA---> //

function renderMensaje(data) {
    const html = data.map((mensajes, index) => {
        return(`
        <div>
            <strong>${mensajes.texto}</strong>:
            <em>${mensajes.email}</em>
        </div>`)
    }).join(" ");
    document.getElementById('mensajes').innerHTML = html;
}

function addMessage(e) {
    const mensaje = {
        author: document.getElementById('email').value,
        text: document.getElementById('texto').value
    };
    
    socket.emit('nuevo-mensaje', mensaje);

    return false;
}

socket.on('mensajes', data => {
    renrenderMensajesder(data);
})