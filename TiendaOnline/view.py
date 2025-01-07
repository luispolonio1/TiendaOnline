from django.shortcuts import render, redirect
from .formularios import FormularioProducto
from .models import Producto
from django.contrib import messages

def index(request):
    productos=Producto.objects.all()
    return render(request,'index.html',{'productos':productos})


def guardar_producto(request):
    if request.method=='POST':
        formulario = FormularioProducto(request.POST,request.FILES)
        if formulario.is_valid():
            formulario.save()
            messages.success(request,'Producto guardado correctamente')
            return redirect(index)

    else:
        formulario=FormularioProducto()
    return render(request,'Guardar_producto.html',{'formulario':formulario})