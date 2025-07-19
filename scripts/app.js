const API_TOKEN = 'patrHdxNUvJYFIG8y.490bd54818ebabdc49a806e6ea198916bef56e8134aee4c95d959becc182d5c3';
const BASE_ID = 'appmfZTWMbAyxqYGV';
const TABLE_NAME = 'Products';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

let products = [];

document.addEventListener("DOMContentLoaded", () => {
    getProducts();
});

const productGrid = document.querySelector('.product-grid');
const searchInput = document.querySelector('#input-search-products');
const offertCheckbox = document.querySelector('#ofertas-checkbox');
const enviosCheckbox = document.querySelector('#envios-checkbox');

const getProducts = async () => {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        products = data.records.map(item => ({
            id: item.id,
            title: item.fields.title,
            price: item.fields.price,
            image: item.fields.image,
            description: item.fields.description || '',
            offert: item.fields.offert || false,
            freeShipping: item.fields.freeShipping || false,
            category: item.fields.category?.toLowerCase() || ''
        }));

        applyFilters();
    } catch (error) {
        console.error('Error al obtener productos:', error);
    }
};

function createProductCard(product) {
    const card = document.createElement('article');
    card.classList.add('product-card');
    card.style.cursor = 'pointer';

    const title = document.createElement('h3');
    title.textContent = product.title;

    const price = document.createElement('p');
    price.textContent = `$${product.price}`;

    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.title;

    card.addEventListener('click', () => {
    window.location.href = `detalle.html?id=${product.id}`;
});

    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(img);

    return card;
}

function renderProducts(list) {
    if (!productGrid) return;
    productGrid.innerHTML = '';
    list.forEach(product => {
        const card = createProductCard(product);
        productGrid.appendChild(card);
    });
}

function applyFilters() {
    let filtered = [...products];

    const categoriaActual = document.body.dataset.categoria;
    if (categoriaActual) {
        filtered = filtered.filter(p =>
            p.category === categoriaActual || p.category === 'ambos'
        );
    }

    const soloOfertas = document.body.dataset.offert === 'true';

    if (soloOfertas) {
        filtered = filtered.filter(p => p.offert === true);
    } else if (offertCheckbox && offertCheckbox.checked) {
        filtered = filtered.filter(p => p.offert === true);
    }

    if (enviosCheckbox && enviosCheckbox.checked) {
        filtered = filtered.filter(p => p.freeShipping === true);
    }

    const searchText = searchInput?.value.trim().toLowerCase();
    if (searchText) {
        filtered = filtered.filter(p =>
            p.title.toLowerCase().includes(searchText)
        );
    }
    renderProducts(filtered);
}

searchInput?.addEventListener('input', applyFilters);
offertCheckbox?.addEventListener('change', applyFilters);
enviosCheckbox?.addEventListener('change', applyFilters);