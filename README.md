 🐶🐱 PetShop Int.

**PetShop Int.** es un sitio web de venta de productos para perros y gatos. Permite a los usuarios explorar artículos, aplicar filtros avanzados, iniciar sesión y gestionar un carrito de compras. Además, incluye un panel administrativo exclusivo para crear, editar y listar productos desde una base Airtable.

---

## 🌐 Demo

---

## 🧩 Tecnologías utilizadas

- **HTML5**
- **CSS3**
- **JavaScript (Vanilla)**
- **Airtable (como backend de datos)**
- **SweetAlert2** (alertas modernas)
- **LocalStorage** (para sesión y carrito)
- **Git & GitHub**

---

## 🔐 Usuarios de prueba

| Usuario | Contraseña | Rol    |
|--------|------------|--------|
| `admin` | `admin`      | Admin  |
| `usu1`  | `usu1`      | Usuario común |

---

## 📦 Funcionalidades

### 🛍️ Público general
- Ver productos por categoría: **Perros**, **Gatos**, **Ofertas**.
- Filtro por **oferta**, **envío gratis** y **búsqueda por nombre**.
- Ver **detalles del producto** antes de comprar.
- Agregar al carrito (se guarda en `localStorage`).
- Eliminar productos del carrito.
- Formulario de contacto funcional con formspreed y SweetAlert.

### 🧑‍💼 Panel administrativo (`/admin/products.html`)
- Acceso exclusivo para `admin`.
- Ver todos los productos con tabla editable.
- Crear nuevos productos.
- Editar productos existentes.
- Conexión a Airtable vía Fetch API con token seguro (desde frontend).
