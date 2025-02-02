from django.shortcuts import render, redirect, get_object_or_404
from .formularios import FormularioProducto
from .models import Producto
from django.contrib import messages
from django.http import JsonResponse
import json

def index(request):
    productos=Producto.objects.all()
    return render(request,'index.html',{'productos':productos})


def guardar_producto(request):
    if request.method=='POST':
        formulario=FormularioProducto(request.POST,request.FILES)
        if formulario.is_valid():
            formulario.save()
            messages.success(request,'Producto guardado correctamente')
            return redirect(index)
    else:
        formulario=FormularioProducto()
    return render(request,'Guardar_producto.html',{'formulario':formulario})


def productos_ajustes(request):
    productos=Producto.objects.all()
    return render(request,'Productos_Ajustes.html',{'productos':productos})


def eliminar_producto(request,pk):
    producto=get_object_or_404(Producto,pk=pk)
    producto.delete()
    return redirect('productos_ajustes')

def modificar_producto(request,pk):
    producto=get_object_or_404(Producto,pk=pk)
    if request.method=='POST':
        formulario=FormularioProducto(request.POST,instance=producto)
        if formulario.is_valid():
            formulario.save()
            return redirect('productos_ajustes')
    else:
        formulario=FormularioProducto(instance=producto)
    return render(request,'Guardar_producto.html',{'formulario':formulario})


def suma_productos_agregados(request,pk):
    producto=get_object_or_404(Producto,pk=pk)
    if request.method=='POST':
        datos={
            'nombre':producto.nombre,
            'precio':producto.precio,
            'stock':producto.stock,
        }
        return JsonResponse(datos)


def recibir_datos(request):
    if request.method == 'POST':
        productos_js = json.loads(request.body)# Leer los datos del cuerpo de la solicitud
        for producto in productos_js:
            nombre = producto.get('nombre')
            cantidad = producto.get('stock')
            print(f"Nombre: {nombre}, Cantidad: {cantidad}")

        # Responder al cliente
        return JsonResponse({'mensaje': 'Datos recibidos correctamente'})