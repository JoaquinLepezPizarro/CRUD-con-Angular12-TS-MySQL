import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MarcasService } from '../../servicios/marcas.service';

@Component({
  selector: 'app-mostrar-marca',
  templateUrl: './mostrar-marca.component.html',
  styleUrls: ['./mostrar-marca.component.scss']
})

export class MostrarMarcaComponent implements OnInit {
  
  constructor(private metodos:MarcasService, private router:ActivatedRoute) { }
  
  flag: String = 'mostrar';
  datosMarca: any;
  nombreActual: any;
  auxMarca: any;
  auxId: any;
  auxAuxId: any;
  cantProductosPorMarca: any;

  ngOnInit(): void {
    this.mostrarTodasLasMarcas();
    this.metodoFlag(this.flag);
    this.mostrarMarca(this.auxId);
  }

  
  
//----------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------METODOS MARCAS-----------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------------------//

  //MOSTRAR TODAS LAS MARCAS
  mostrarTodasLasMarcas() {
    this.metodos.mostrarTodasLasMarcas().subscribe((res:any)=>{
      this.datosMarca = res.data;
    });
  }

  //MOSTRAR UN MARCA
  mostrarMarca(id:any) {
    this.auxId = id;
    this.auxAuxId = id;
    this.metodos.mostrarMarca(id).subscribe((res:any) => {
      this.auxMarca = res.data;
    })
  }
  
  //ELIMINAR MARCA
  eliminarMarcaAux(idMarca:any) {
    this.metodos.eliminarMarca(idMarca).subscribe((res:any)=>{
      this.mostrarTodasLasMarcas();
    });
  }
/*
//ELIMINAR MARCA
  eliminarMarcaAux(idMarca:any) {
    this.metodos.productosPorMarca(idMarca).subscribe(res => {
      let cant = <any>res;
      console.log("cant en mostrar: " + cant);
      console.log("res en mostrar: " + res);
      if (cant == 0) {
        console.log("mostrar, detecto 0");
        this.metodos.eliminarMarca(idMarca).subscribe((res:any) => {
          this.mostrarTodasLasMarcas();
        })
      }
      else {
        console.log("mostrar, detecto distinto de 0");
        window.alert("No se puede eliminar la marca. Elimine los productos asociados primero");
      }
    })
    console.log("cantProductosPorMarca en mostrar: " + this.cantProductosPorMarca);
  }



//ELIMINAR MARCA
  eliminarMarca(idMarca:any) {
    this.metodos.productosPorMarca(idMarca).subscribe((res:any) => {
      console.log(res,'res==>');
      console.log("res en mostrar marca: " + res);
      if (res == 0) {
        this.metodos.eliminarMarca(idMarca).subscribe((res:any) => {
          this.mostrarTodasLasMarcas();
        })
      }
      else {
        window.alert("No se puede eliminar la marca. Elimine los productos asociados primero");
      }
    })
    console.log("cantProductosPorMarca en mostrar: " + this.cantProductosPorMarca);
  }






  //ELIMINAR MARCA
  eliminarMarca(idMarca:any) {
    if (this.metodos.productosPorMarca(idMarca).subscribe((res:any) => {}) == 0){
      this.metodos.eliminarMarca(idMarca).subscribe((res:any) => {
        this.mostrarTodasLasMarcas();
      })
    }
    else {
      window.alert("No se puede eliminar la marca. Elimine los productos asociados primero");
    }
  }*/
/*
  //ELIMINAR MARCA
  eliminarMarca(idMarca:any) {
    let cantProductosPorMarca: any;
    cantProductosPorMarca = this.metodos.productosPorMarca(idMarca).subscribe;
    console.log("cantidad de productos por marca: "+cantProductosPorMarca);
    if(cantProductosPorMarca.value == 0){
      this.metodos.eliminarMarca(idMarca).subscribe((res:any) => {
        this.mostrarTodasLasMarcas();
      });
    }
    else{
      window.alert("No se puede eliminar la marca. Elimine los productos asociados primero");
    }
  }  */
  
  //EDITAR MARCA
  editarMarca(nuevaMarca:any) {
    this.metodos.editarMarca(nuevaMarca.value, this.auxId).subscribe((res:any) => {
      this.nuevaMarca.reset();
    });
  }

  //CREAR OBJETO MARCA
  nuevaMarca = new FormGroup ({
    'nombre': new FormControl('',Validators.required),
  });



//----------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------OTROS METODOS -----------------------------------------------------------//
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


  /*
  //EDITAR
  editarMarca(nuevaMarca:any, id:any) {
    this.metodos.editarMarca(nuevaMarca.value, id).subscribe((res:any) => {
      this.nuevaMarca.reset();
     });
  }
  */