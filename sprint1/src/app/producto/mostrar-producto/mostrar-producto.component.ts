import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MarcasService } from 'src/app/servicios/marcas.service';
import { ProductosService } from '../../servicios/productos.service';


@Component({
  selector: 'app-mostrar-producto',
  templateUrl: './mostrar-producto.component.html',
  styleUrls: ['./mostrar-producto.component.scss']
})
export class MostrarProductoComponent implements OnInit {

  constructor(private metodos:ProductosService, private metodosMarca:MarcasService) { }
  
  flag: String = 'mostrar';
  datosProducto: any;
  datosMarca: any;
  nombreActual: any;
  auxProducto: any;
  auxId: any;
  
  ngOnInit(): void {
    this.mostrarTodosLosProductos();
    this.metodoFlag(this.flag);
    this.mostrarProducto(this.auxId);
    this.idMarcas();
  }

  
  
//----------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------METODOS MARCAS-----------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------------------//
 
  //MOSTRAR TODOS LOS PRODUCTOS
  mostrarTodosLosProductos() {
    this.metodos.mostrarTodosLosProductos().subscribe((res:any)=>{
      this.datosProducto = res.data;
    });
  }
  
  //MOSTRAR UN PRODUCTO
  mostrarProducto(id:any) {
    this.auxId = id;
    this.metodos.mostrarProducto(id).subscribe((res:any) => {
      this.auxProducto = res.data;
    })
  }

  //ELIMINAR PRODUCTO
  eliminarProducto(id:any) {
    this.metodos.eliminarProducto(id).subscribe((res:any) => {
      this.mostrarTodosLosProductos();
     });
    }

  //EDITAR PRODUCTO
  editarProducto(nuevoProducto:any) {
    this.metodos.editarProducto(nuevoProducto.value, this.auxId).subscribe((res:any) => {
      this.nuevoProducto.reset();
     });
  }

  //CREAR OBJETO PRODUCTO
  nuevoProducto = new FormGroup ({
    'nombre': new FormControl('',Validators.required),
    'valor': new FormControl('',Validators.required),
    'estado': new FormControl('',Validators.required),
    'nombreMarca': new FormControl('',Validators.required),
  });


  
//----------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------METODOS MARCAS-----------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------------------//

//OBTENER ID MARCA
  idMarcas() {
    this.metodosMarca.mostrarTodasLasMarcas().subscribe((res:any) =>{
      this.datosMarca = res.data;
    })
  }



//----------------------------------------------------------------------------------------------------------------------//
//----------------------------------------------OTROS METODOS-----------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------------------//

//SEMAFORO MOSTRAR-EDITAR
  metodoFlag(auxValorFlag:String) {
    this.flag = auxValorFlag;
  }
  
//ACTUALIZAR PAGINA
  actualizarPagina() {
    window.location.reload();
  }
}





