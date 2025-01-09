from  django.db import models

class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    precio = models.FloatField()
    stock = models.IntegerField()
    info  = models.TextField()
    img = models.ImageField(upload_to='files/imagenes',null=True)

    def __str__(self):
        return f"{self.nombre} - Precio: ${self.precio} - Stock: {self.stock}"


