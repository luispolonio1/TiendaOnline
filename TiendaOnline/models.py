from  django.db import models

class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    precio = models.DecimalField(max_digits=5, decimal_places=2)
    stock = models.IntegerField()
    info  = models.TextField()
    img = models.ImageField(upload_to='files/imagenes',null=True)
