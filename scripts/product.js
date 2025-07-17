const API_TOKEN = 'patrHdxNUvJYFIG8y.490bd54818ebabdc49a806e6ea198916bef56e8134aee4c95d959becc182d5c3';
const BASE_ID = 'appmfZTWMbAyxqYGV';
const TABLE_NAME = 'Products';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

let products = [];

document.addEventListener("DOMContentLoaded", () => {
    getProducts();
});

const productListTable = document.getElementById('product-list');
const btnAddProduct = document.getElementById('btn-add-product');
const addProductForm = document.getElementById('add-product-form');
const btnCancel = document.getElementById('btn-cancel');

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
            offert: item.fields.offert || false,
            freeShipping: item.fields.freeShipping || false,
            category: item.fields.category?.toLowerCase() || '',
            description: item.fields.description || ''
        }));


        renderTableProducts(products);
    } catch (error) {
        console.error('Error al obtener productos:', error);
    }
};

function renderTableProducts(list) {
    productListTable.innerHTML = '';

    list.forEach(product => {
        const row = document.createElement('tr');

        const titleTd = document.createElement('td');
        titleTd.textContent = product.title;

        const priceTd = document.createElement('td');
        priceTd.textContent = `$${product.price}`;

        const categoryTd = document.createElement('td');
        categoryTd.textContent = product.category;

        const actionTd = document.createElement('td');
        actionTd.innerHTML = `<button class="ver-detalle">Editar</button>`;
        actionTd.querySelector('button').addEventListener('click', () => {
        window.location.href = `edit-product.html?id=${product.id}`;
});

        row.appendChild(titleTd);
        row.appendChild(priceTd);
        row.appendChild(categoryTd);
        row.appendChild(actionTd);

        productListTable.appendChild(row);
    });
}

btnAddProduct?.addEventListener('click', () => {
    addProductForm.style.display = 'block';
    btnAddProduct.style.display = 'none';
});

btnCancel?.addEventListener('click', () => {
    addProductForm.style.display = 'none';
    btnAddProduct.style.display = 'block';
    addProductForm.reset();
});

addProductForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newProduct = {
        title: document.getElementById('title').value.trim(),
        price: parseFloat(document.getElementById('price').value),
        category: document.getElementById('category').value.trim().toLowerCase(),
        image: document.getElementById('image').value.trim(),
        description: document.getElementById('description').value.trim(),
        offert: document.getElementById('offert').checked,
        freeShipping: document.getElementById('freeShipping').checked
    };

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fields: newProduct })
        });

        alert('Producto creado con éxito!');
        addProductForm.reset();
        addProductForm.style.display = 'none';
        btnAddProduct.style.display = 'block';
        getProducts();
    } catch (error) {
        console.error('Error al crear producto:', error);
        alert('Hubo un error al crear el producto.');
    }
});
