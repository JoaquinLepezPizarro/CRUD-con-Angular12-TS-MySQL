import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class MarcasService {

    constructor(private metodos:HttpClient) { }

    marcasUrl = 'http://127.0.0.1:3000/marca';


    
  //----------------------------------------------------------------------------------------------------------------------//
  //------------------------------------------METODOS DE MARCAS-----------------------------------------------------------//
  //----------------------------------------------------------------------------------------------------------------------//

    //MOSTRAR TODAS LAS MARCAS
    mostrarTodasLasMarcas():Observable<any> {
      return this.metodos.get(`${this.marcasUrl}/mostrarTodas`);
    }

    //MOSTRAR UNA MARCA
    mostrarMarca(nombre:any):Observable<any> {
      let auxNombre = nombre;
      return this.metodos.get(`${this.marcasUrl}/mostrarUna`,auxNombre);
    }

    //EDITAR MARCA
    editarMarca(nuevaMarca:any, nombreActual:any):Observable<any> {
      let auxNombreActual = nombreActual;
      return this.metodos.put(`${this.marcasUrl}/editar/${auxNombreActual}`,nuevaMarca);
    }
    
    //VER SI EXISTEN PRODUCTOS POR MARCA
    productosPorMarca(idMarca:any):Observable<any> {
      let auxIdMarca = idMarca;
      return this.metodos.get(`${this.marcasUrl}/obtenerProductos/${auxIdMarca}`);
    }

    //ELIMINAR MARCA
    eliminarMarca(idMarca:any):Observable<any> {
      let auxIdMarca = idMarca;
      return this.metodos.delete(`${this.marcasUrl}/eliminar/${auxIdMarca}`);
    }

    //AGREGAR MARCA
    agregarMarca(nuevaMarca:any):Observable<any> {
      let auxNuevaMarca = nuevaMarca; 
      return this.metodos.post(`${this.marcasUrl}/agregar`,auxNuevaMarca);
    }
  }
