const API_TOKEN = 'patrHdxNUvJYFIG8y.490bd54818ebabdc49a806e6ea198916bef56e8134aee4c95d959becc182d5c3';
const BASE_ID = 'appmfZTWMbAyxqYGV';
const TABLE_NAME = 'Products';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

if (!productId) {
    document.querySelector('.detalle-container').innerHTML = '<p>Producto no encontrado.</p>';
} else {
    fetch(`${API_URL}/${productId}`, {
        headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            const product = data.fields;
            renderProductDetails(product, productId);
        })
        .catch(error => {
            console.error('Error al obtener los detalles:', error);
            document.querySelector('.detalle-container').innerHTML = '<p>Error al cargar el producto.</p>';
        });
}

function renderProductDetails(product, id) {
    const container = document.querySelector('.detalle-container');
    container.innerHTML = '';

    const card = document.createElement('div');
    card.classList.add('detalle-producto');

    const title = document.createElement('h2');
    title.textContent = product.title;

    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.title;

    const price = document.createElement('p');
    price.classList.add('price');
    price.textContent = `$${product.price}`;

    const description = document.createElement('p');
    description.classList.add('descripcion');
    description.textContent = product.description || 'Sin descripción disponible.';

    const offert = document.createElement('p');
    if (product.offert) {
        offert.textContent = '🔥 ¡Producto en oferta!';
        offert.classList.add('detalle-oferta');
    }

    const envio = document.createElement('p');
    if (product.freeShipping) {
        envio.textContent = '🚚 Envío gratis disponible';
        envio.classList.add('detalle-envio');
    }

    const btn = document.createElement('button');
    btn.textContent = 'Agregar al carrito';
    btn.classList.add('detalle-btn');
    btn.addEventListener('click', () => {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const exist = carrito.find(p => p.id === id);
        if (!exist) {
            carrito.push({
                id: productId,
                title: product.title,
                price: product.price,
                image: product.image
            });
            localStorage.setItem('carrito', JSON.stringify(carrito));
            Swal.fire({
                icon: 'success',
                title: '¡Listo!',
                text: 'Producto agregado al carrito con éxito',
                confirmButtonColor: '#3085d6'
            });
        }
    });

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(description);
    if (product.offert) card.appendChild(offert);
    if (product.freeShipping) card.appendChild(envio);
    card.appendChild(btn);

    container.appendChild(card);
}
