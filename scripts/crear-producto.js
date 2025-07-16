const API_TOKEN = 'patrHdxNUvJYFIG8y.490bd54818ebabdc49a806e6ea198916bef56e8134aee4c95d959becc182d5c3';
const BASE_ID = 'appmfZTWMbAyxqYGV';
const TABLE_NAME = 'Products';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

document.getElementById('add-product-form').addEventListener('submit', async (e) => {
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

    const productToSend = {
        fields: {
            title: newProduct.title,
            price: newProduct.price,
            category: newProduct.category,
            image: newProduct.image,
            description: newProduct.description,
            offert: newProduct.offert,
            freeShipping: newProduct.freeShipping
        }
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productToSend)
        });

        if (!response.ok) throw new Error('Error al guardar en Airtable');

        alert('Producto creado con éxito!');
        window.location.href = "../admin/products.html";

    } catch (error) {
        console.error(error);
        alert('Error al crear el producto.');
    }
});
