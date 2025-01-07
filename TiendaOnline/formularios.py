from  .models import Producto
from django import forms


class FormularioProducto(forms.ModelForm):
    class Meta:
        model = Producto
        fields = '__all__'