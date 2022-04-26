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