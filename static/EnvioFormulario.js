/*document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("mi_formulario");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(form);

        try {
            const response = await fetch("{% url 'guardar_producto' %}", {
                method: "POST",
                headers: {
                    "X-CSRFToken": "{{ csrf_token }}",
                },
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                alert(result.mensaje);
            } else {
                alert("Error: " + result.mensaje);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("No se pudo guardar el producto.");
        }
    });
});

*/
