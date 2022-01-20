import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearMarcaComponent } from './marca/crear-marca/crear-marca.component';
import { MostrarMarcaComponent } from './marca/mostrar-marca/mostrar-marca.component';
import { CrearProductoComponent } from './producto/crear-producto/crear-producto.component';
import { MostrarProductoComponent } from './producto/mostrar-producto/mostrar-producto.component';

//RUTAS DE LA PÁGINA
const routes: Routes = [
  {path:"",component:MostrarMarcaComponent},
  {path:"mostrar-marca",component:MostrarMarcaComponent},
  {path:"crear-marca",component:CrearMarcaComponent},
  {path:"crear-producto",component:CrearProductoComponent},
  {path:"mostrar-producto",component:MostrarProductoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


//AL USAR "": EL COMPONENTE QUE ESTÉ VINCULADO SERÁ EL QUE SE MOSTRARA COMO PÁGINA PRINCIPAL