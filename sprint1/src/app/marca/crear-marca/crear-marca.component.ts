import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { MarcasService } from 'src/app/servicios/marcas.service';

@Component({
  selector: 'app-crear-marca',
  templateUrl: './crear-marca.component.html',
  styleUrls: ['./crear-marca.component.scss']
})

export class CrearMarcaComponent implements OnInit {

  constructor(private metodos:MarcasService) { }

  nuevoNombre: any;
  
  ngOnInit(): void {
    
  }



//----------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------METODOS MARCAS-----------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------------------//
  
  //AGREGAR MARCA
  agregarMarca(nuevaMarca:any) {
    if (nuevaMarca.valid) {
      this.metodos.agregarMarca(nuevaMarca.value).subscribe((res:any) => {
        this.nuevaMarca.reset();
      })
    }
  }

  //CREAR OBJETO MARCA
  nuevaMarca = new FormGroup ({
    'nombre': new FormControl('',Validators.required)
  });
}


/*
nuevaMarca = new FormGroup ({
    'nombre': new FormControl('',Validators.required),
    'fechaCreacion': new FormControl('',Validators.required),
    'fechaActualizacion' : new FormControl('',Validators.required) 
  });
*/
