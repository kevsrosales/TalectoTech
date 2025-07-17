const API_TOKEN = 'patrHdxNUvJYFIG8y.490bd54818ebabdc49a806e6ea198916bef56e8134aee4c95d959becc182d5c3';
const BASE_ID = 'appmfZTWMbAyxqYGV';
const TABLE_NAME = 'Users';
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

async function login(event) {
    event.preventDefault();

    const usuario = document.querySelector("#usuario").value.trim();
    const password = document.querySelector("#password").value.trim();
    const msg = document.querySelector("#login-message");

    try {
        const res = await fetch(API_URL, {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();

        const users = data.records.map(record => ({
            usuario: record.fields.usuario,
            password: record.fields.password,
            role: record.fields.role
        }));

        const user = users.find(u => u.usuario === usuario && u.password === password);

        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
            msg.style.color = "green";
            msg.textContent = `Sesión iniciada como ${user.role}`;

            setTimeout(() => {
                if (user.role === "admin") {
                    window.location.href = "./admin/products.html";
                } else {
                    window.location.href = "./index.html";
                }
            }, 1000);
        } else {
            msg.style.color = "red";
            msg.textContent = "Usuario o contraseña incorrectos.";
        }

    } catch (error) {
        console.error("Error al conectar con Airtable:", error);
        msg.textContent = "Error al iniciar sesión.";
    }
}
