import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { NgSelectModule } from '@ng-select/ng-select';
import {CalendarModule} from 'primeng/calendar';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './main/header/header.component';
import { FooterComponent } from './main/footer/footer.component';
import { MenuSidebarComponent } from './main/menu-sidebar/menu-sidebar.component';
import { BlankComponent } from './pages/blank/blank.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './pages/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { MessagesDropdownMenuComponent } from './main/header/messages-dropdown-menu/messages-dropdown-menu.component';
import { NotificationsDropdownMenuComponent } from './main/header/notifications-dropdown-menu/notifications-dropdown-menu.component';
import { SolicitudComponent } from './pages/solicitud/solicitud.component';
import { SolicitudCreateComponent } from './pages/solicitud/solicitud-create/solicitud-create.component';
import { SolicitudEditComponent } from './pages/solicitud/solicitud-edit/solicitud-edit.component';
import { SolicitudIndexComponent } from './pages/solicitud/solicitud-index/solicitud-index.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { UsuarioIndexComponent } from './pages/usuario/usuario-index/usuario-index.component';
import { UsuarioCreateComponent } from './pages/usuario/usuario-create/usuario-create.component';
import { UsuarioEditComponent } from './pages/usuario/usuario-edit/usuario-edit.component';
import { EmpresaComponent } from './pages/empresa/empresa.component';
import { EmpresaIndexComponent } from './pages/empresa/empresa-index/empresa-index.component';
import { EmpresaCreateComponent } from './pages/empresa/empresa-create/empresa-create.component';
import { EmpresaEditComponent } from './pages/empresa/empresa-edit/empresa-edit.component';
import { BeneficioComponent } from './pages/beneficio/beneficio.component';
import { BeneficioIndexComponent } from './pages/beneficio/beneficio-index/beneficio-index.component';
import { BeneficioCreateComponent } from './pages/beneficio/beneficio-create/beneficio-create.component';
import { BeneficioEditComponent } from './pages/beneficio/beneficio-edit/beneficio-edit.component';
import { NoticiaComponent } from './pages/noticia/noticia.component';
import { NoticiaIndexComponent } from './pages/noticia/noticia-index/noticia-index.component';
import { NoticiaCreateComponent } from './pages/noticia/noticia-create/noticia-create.component';
import { NoticiaEditComponent } from './pages/noticia/noticia-edit/noticia-edit.component';

import { ReportesComponent } from './pages/reportes/reportes.component';
import { GraficasComponent } from './pages/graficas/graficas.component';
import { ComisionComponent } from './pages/comision/comision.component';
import { BonificacionComponent } from './pages/bonificacion/bonificacion.component';
import { ParametroComponent } from './pages/parametro/parametro.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { ProductoIndexComponent } from './pages/producto/producto-index/producto-index.component';
import { ProductoCreateComponent } from './pages/producto/producto-create/producto-create.component';
import { ProductoEditComponent } from './pages/producto/producto-edit/producto-edit.component';
import { PresentacionComponent } from './pages/presentacion/presentacion.component';
import { PresentacionIndexComponent } from './pages/presentacion/presentacion-index/presentacion-index.component';
import { PresentacionCreateComponent } from './pages/presentacion/presentacion-create/presentacion-create.component';
import { PresentacionEditComponent } from './pages/presentacion/presentacion-edit/presentacion-edit.component';
import { RepartidorComponent } from './pages/repartidor/repartidor.component';
import { RepartidorIndexComponent } from './pages/repartidor/repartidor-index/repartidor-index.component';
import { RepartidorEditComponent } from './pages/repartidor/repartidor-edit/repartidor-edit.component';
import { RepartidorCreateComponent } from './pages/repartidor/repartidor-create/repartidor-create.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ClienteIndexComponent } from './pages/cliente/cliente-index/cliente-index.component';
import { ClienteEditComponent } from './pages/cliente/cliente-edit/cliente-edit.component';
import { ClienteCreateComponent } from './pages/cliente/cliente-create/cliente-create.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    MenuSidebarComponent,
    BlankComponent,
    ProfileComponent,
    RegisterComponent,
    DashboardComponent,
    MessagesDropdownMenuComponent,
    NotificationsDropdownMenuComponent,
    SolicitudComponent,
    SolicitudCreateComponent,
    SolicitudEditComponent,
    SolicitudIndexComponent,
    UsuarioComponent,
    UsuarioIndexComponent,
    UsuarioCreateComponent,
    UsuarioEditComponent,
    EmpresaComponent,
    EmpresaIndexComponent,
    EmpresaCreateComponent,
    EmpresaEditComponent,
    BeneficioComponent,
    BeneficioIndexComponent,
    BeneficioCreateComponent,
    BeneficioEditComponent,
    NoticiaComponent,
    NoticiaIndexComponent,
    NoticiaCreateComponent,
    NoticiaEditComponent,
    ReportesComponent,
    GraficasComponent,
    ComisionComponent,
    BonificacionComponent,
    ParametroComponent,
    ProductoComponent,
    ProductoIndexComponent,
    ProductoCreateComponent,
    ProductoEditComponent,
    PresentacionComponent,
    PresentacionIndexComponent,
    PresentacionCreateComponent,
    PresentacionEditComponent,
    RepartidorComponent,
    RepartidorIndexComponent,
    RepartidorEditComponent,
    RepartidorCreateComponent,
    ClienteComponent,
    ClienteIndexComponent,
    ClienteEditComponent,
    ClienteCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
    FormsModule,
    HttpClientModule,
    AngularFileUploaderModule,
    DropdownModule,
    TableModule,
    NgSelectModule,
    CalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
