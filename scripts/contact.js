function enviarConsulta(event) {
    event.preventDefault();

    const nombre = document.querySelector('input[name="nombre"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const mensaje = document.querySelector('textarea[name="mensaje"]').value.trim();

    // mensaje nuevo
    Swal.fire({
        icon: 'success',
        title: 'Consulta enviada',
        text: 'Gracias por contactarnos, te responderemos pronto.',
        confirmButtonColor: '#3085d6'
    });

    event.target.reset(); // Limpiar el formulario
}
