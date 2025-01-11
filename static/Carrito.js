let carritoProductos = []; // Arreglo para almacenar los productos en el carrito

// Seleccionar todos los botones de agregar producto
let ProductoAgregar = document.querySelectorAll('.btn-agregar');

ProductoAgregar.forEach((Producto) => {
    Producto.addEventListener('click', async (evento) => {
        evento.preventDefault(); // Prevenir cualquier comportamiento por defecto

        // Obtener el ID del producto desde el atributo data-pk
        const productoId = Producto.getAttribute('data-pk');
        try {
            const response = await fetch(`/AgregarProductoCarrito/${productoId}/`, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
                },
            });

            if (!response.ok) throw new Error('Error al agregar producto');

            const data = await response.json(); // Datos del producto del backend
            let productoEnCarrito = carritoProductos.find(item => item.nombre === data.nombre);
            if (productoEnCarrito) {
                productoEnCarrito.cantidad++;
                return;
            }else{
                    carritoProductos.push({
                        nombre: data.nombre,
                        precio: data.precio,
                        cantidad: 1
                    });}
            let carritovalor = document.getElementById('CarritoValor').textContent;
            document.getElementById('CarritoValor').textContent = `${parseInt(carritovalor) + 1}`;
        } catch (error) {
            console.error('Error:', error);
        }
    });
});

//Evento para mostrar la factura
let Carrito = document.getElementById('Carrito');
productos = []
Carrito.addEventListener('click', () => {
    if (carritoProductos.length === 0) {
        Swal.fire({
            title: "Carrito vacío",
            text: "No has agregado ningún producto al carrito.",
            icon: "warning"
        });
        return;
    }

    // Crear contenido de la factura
    let contenidoFactura = `
        <div style="font-family: Arial, sans-serif; text-align: left; padding: 10px;">
            <h3 style="text-align: center; margin-bottom: 20px;">Factura</h3>
            <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd; margin-bottom: 20px;">
                <thead>
                    <tr style="background-color: #f9f9f9; border-bottom: 2px solid #ddd;">
                        <th style="padding: 10px; text-align: left; border-right: 1px solid #ddd;">Producto</th>
                        <th style="padding: 10px; text-align: center; border-right: 1px solid #ddd;">Cantidad</th>
                        <th style="padding: 10px; text-align: right;">Valor</th>
                    </tr>
                </thead>
                <tbody>
                    ${carritoProductos.map(item => `
                        <tr>
                            <td style="padding: 10px; border-right: 1px solid #ddd;">${item.nombre}</td>
                            <td style="padding: 10px; text-align: center; border-right: 1px solid #ddd;">${item.cantidad}</td>
                            <td style="padding: 10px; text-align: right;">$${(item.precio * item.cantidad).toFixed(2)}</td>
                        </tr>
                    `).join('')}
                    <tr style="border-top: 2px solid #ddd;">
                        <td colspan="2" style="padding: 10px; font-weight: bold;">Total</td>
                        <td style="padding: 10px; font-weight: bold; text-align: right;">$${carritoProductos.reduce((sum, item) => sum + (item.precio * item.cantidad), 0).toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
    Swal.fire({
        title: "Tu Factura",
        html: contenidoFactura,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Pagar"
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Factura pagada",
              text: "Tu pedido esta siendo procesado",
              icon: "success",
            });
            carritoProductos.forEach((producto)=>{
                producto = {nombre:producto.nombre,stock:producto.cantidad}
                productos.push(producto)
            })
              const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
              fetch('/Enviojs', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                      'X-CSRFToken': csrfToken
                  },
                  body: JSON.stringify(productos) // Convierte los datos a formato JSON
                })
                .then(response => response.json())
                .then(data => {
                  console.log("Respuesta del servidor:", data);
                })
                .catch(error => {
                  console.error("Error:", error);
                });
              document.getElementById('CarritoValor').textContent = `${0}`;
              carritoProductos=[]
          }
});
});




