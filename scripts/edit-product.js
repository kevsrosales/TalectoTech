const API_TOKEN = 'patrHdxNUvJYFIG8y.490bd54818ebabdc49a806e6ea198916bef56e8134aee4c95d959becc182d5c3';
const BASE_ID = 'appmfZTWMbAyxqYGV';
const TABLE_NAME = 'Products';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        fetch(`${API_URL}/${productId}`, {
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
            }
        })
            .then(response => response.json())
            .then(data => {
                if (!data.error) {
                    document.querySelector('#product-title').value = data.fields.title || '';
                    document.querySelector('#product-price').value = data.fields.price || '';
                    document.querySelector('#product-category').value = data.fields.category || '';
                    document.querySelector('#product-image').value = data.fields.image || '';
                    document.querySelector('#product-description').value = data.fields.description || '';
                    document.querySelector('#product-offert').checked = data.fields.offert || false;
                    document.querySelector('#product-freeShipping').checked = data.fields.freeShipping || false;
                }
            })
            .catch(error => console.error('Error cargando producto:', error));
    }
});

function updateSubmit(event) {
    event.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        alert('No se ha proporcionado un ID de producto válido.');
        return;
    }

    const title = document.querySelector('#product-title').value.trim();
    const price = parseFloat(document.querySelector('#product-price').value);
    const category = document.querySelector('#product-category').value.trim();
    const image = document.querySelector('#product-image').value.trim();
    const description = document.querySelector('#product-description').value.trim();
    const offert = document.querySelector('#product-offert').checked;
    const freeShipping = document.querySelector('#product-freeShipping').checked;

    if (!title || isNaN(price)) {
        alert('Por favor, completa todos los campos requeridos.');
        return;
    }

    const product = {
        title: title,
        price: price,
        category: category,
        image: image,
        description: description,
        offert,
        freeShipping
    };

    const itemAirTable = {
        fields: product
    };

    fetch(`${API_URL}/${productId}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemAirTable)
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                console.error(`Error detallado`, data);
                Swal.fire({
                    icon: 'error',
                    title: `Error al actualizar`,
                    text: `${data.error.message}`,
                    confirmButtonColor: '#d33'
                });
                ;
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Actualizado',
                    text: 'El producto fue modificado correctamente',
                    confirmButtonColor: '#3085d6'
                }).then(() => {
                    window.location.href = './products.html';
                });

            }
        })
        .catch(error => {
            console.error('Error de red:', error);
            alert('Error de red o conexión.');
        });
}