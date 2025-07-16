const carritoProducts = JSON.parse(localStorage.getItem('carrito')) || [];

function createProductCarritoCard(product, index) {
    const card = document.createElement('article');
    card.classList.add('product-card');
    card.style.cursor = 'pointer';

    card.addEventListener('click', (e) => {
        if (e.target.tagName.toLowerCase() === 'button') return;
        window.location.href = `detalle.html?id=${product.id}`;
    });

    const title = document.createElement('h3');
    title.textContent = product.title;

    const price = document.createElement('p');
    price.textContent = `$${product.price}`;

    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.title;

    const button = document.createElement('button');
    button.textContent = 'Eliminar';
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        carritoProducts.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(carritoProducts));
        renderCarritoProducts(carritoProducts);
        Swal.fire({
            icon: 'warning',
            title: '¡Listo!',
            text: 'Eliminaste el producto',
            confirmButtonColor: '#3085d6'
        });
    });

    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(img);
    card.appendChild(button);

    return card;
}

function renderCarritoProducts(list) {
    const carritoGrid = document.querySelector('.carrito-grid');
    carritoGrid.innerHTML = '';

    if (list.length === 0) {
        carritoGrid.textContent = 'No hay productos en el carrito.';
        return;
    }

    list.forEach((product, index) => {
        const card = createProductCarritoCard(product, index);
        carritoGrid.appendChild(card);
    });
}

renderCarritoProducts(carritoProducts);