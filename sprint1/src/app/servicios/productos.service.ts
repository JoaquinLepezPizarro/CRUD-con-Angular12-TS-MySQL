import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ProductosService {

    constructor(private metodos:HttpClient) { }

    productosUrl = 'http://127.0.0.1:3000/producto';


    //----------------------------------------------------------------------------------------------------------------------//
    //----------------------------------------METODOS DE PRODUCTOS----------------------------------------------------------//
    //----------------------------------------------------------------------------------------------------------------------//
    
    //MOSTRAR TODOS LOS PRODUCTOS
    mostrarTodosLosProductos():Observable<any> {
      return this.metodos.get(`${this.productosUrl}/mostrarTodos`);
    }

    //MOSTRAR UN PRODUCTO
    mostrarProducto(id:any):Observable<any> {
      let auxId = id;
      return this.metodos.get(`${this.productosUrl}/mostrarUno`,auxId);
    }

    //EDITAR PRODUCTO
    editarProducto(nuevoProducto:any, id:any):Observable<any> {
      let auxId = id;
      return this.metodos.put(`${this.productosUrl}/editar/${auxId}`,nuevoProducto);
    }
    
    //ELIMINAR PRODUCTO
    eliminarProducto(id:any):Observable<any> {
      let auxId = id;
      return this.metodos.delete(`${this.productosUrl}/eliminar/${auxId}`);
    }
    
    //AGREGAR PRODUCTO
    agregarProducto(nuevoProducto:any):Observable<any> {
      let auxNuevoProducto = nuevoProducto; 
      return this.metodos.post(`${this.productosUrl}/agregar`,auxNuevoProducto);
    }
}