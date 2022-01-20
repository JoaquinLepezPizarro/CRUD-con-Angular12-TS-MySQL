import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { MarcasService } from 'src/app/servicios/marcas.service';
import { ProductosService } from 'src/app/servicios/productos.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss']
})

export class CrearProductoComponent implements OnInit {

  constructor(private metodos:ProductosService, private metodosMarca:MarcasService) { }

  nuevoNombre: any;
  datosMarca: any;
  
  ngOnInit(): void {
    this.idMarcas();
  }



//----------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------METODOS PRODUCTOS--------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------------------//
  
  //AGREGAR PRODUCTO
  agregarProducto(nuevoProducto:any) {
    if (nuevoProducto.valid) {
      this.metodos.agregarProducto(nuevoProducto.value).subscribe((res:any) => {
        this.nuevoProducto.reset();
      })
    }
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

//OBTENER ID
idMarcas() {
  this.metodosMarca.mostrarTodasLasMarcas().subscribe((res:any) =>{
    this.datosMarca = res.data;
  })
}
}
