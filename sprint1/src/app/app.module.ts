//MÓDULOS
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
 
//SERVICIOS
import { MarcasService } from './servicios/marcas.service';
import { ProductosService } from './servicios/productos.service';

//RUTAS
import { AppRoutingModule} from './app-routing.module';

//COMPONENTES
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CrearMarcaComponent } from './marca/crear-marca/crear-marca.component';
import { MostrarMarcaComponent } from './marca/mostrar-marca/mostrar-marca.component';
import { CrearProductoComponent } from './producto/crear-producto/crear-producto.component';
import { MostrarProductoComponent } from './producto/mostrar-producto/mostrar-producto.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CrearMarcaComponent,
    MostrarMarcaComponent,
    CrearProductoComponent,
    MostrarProductoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [MarcasService, ProductosService],
  bootstrap: [AppComponent]                                                            
})
export class AppModule { }
