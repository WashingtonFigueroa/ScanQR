import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { BlankComponent } from './pages/blank/blank.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './utils/guards/auth.guard';
import { NonAuthGuard } from './utils/guards/non-auth.guard';

import { SolicitudComponent } from './pages/solicitud/solicitud.component';
import { SolicitudCreateComponent } from './pages/solicitud/solicitud-create/solicitud-create.component';
import { SolicitudEditComponent } from './pages/solicitud/solicitud-edit/solicitud-edit.component';
import { SolicitudIndexComponent } from './pages/solicitud/solicitud-index/solicitud-index.component';
import { RepartidorComponent } from './pages/repartidor/repartidor.component';
import { RepartidorIndexComponent } from './pages/repartidor/repartidor-index/repartidor-index.component';
import { RepartidorEditComponent } from './pages/repartidor/repartidor-edit/repartidor-edit.component';
import { RepartidorCreateComponent } from './pages/repartidor/repartidor-create/repartidor-create.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ClienteIndexComponent } from './pages/cliente/cliente-index/cliente-index.component';
import { ClienteEditComponent } from './pages/cliente/cliente-edit/cliente-edit.component';
import { ClienteCreateComponent } from './pages/cliente/cliente-create/cliente-create.component';
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
import { ProductoComponent } from './pages/producto/producto.component';
import { ProductoIndexComponent } from './pages/producto/producto-index/producto-index.component';
import { ProductoCreateComponent } from './pages/producto/producto-create/producto-create.component';
import { ProductoEditComponent } from './pages/producto/producto-edit/producto-edit.component';
import { PresentacionComponent } from './pages/presentacion/presentacion.component';
import { PresentacionIndexComponent } from './pages/presentacion/presentacion-index/presentacion-index.component';
import { PresentacionCreateComponent } from './pages/presentacion/presentacion-create/presentacion-create.component';
import { PresentacionEditComponent } from './pages/presentacion/presentacion-edit/presentacion-edit.component';


import { ReportesComponent } from './pages/reportes/reportes.component';
import { GraficasComponent } from './pages/graficas/graficas.component';
import { ComisionComponent } from './pages/comision/comision.component';
import { BonificacionComponent } from './pages/bonificacion/bonificacion.component';
import { ParametroComponent } from './pages/parametro/parametro.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard],
    children: [
      {  path: 'profile',  component: ProfileComponent},
      {  path: 'blank',  component: BlankComponent},
      {  path: 'solicitud',  component: SolicitudComponent,
      children: [
        {  path: '',  component: SolicitudIndexComponent},
        {  path: 'index',  component: SolicitudIndexComponent},
        {  path: 'create',  component: SolicitudCreateComponent},
        {  path: 'edit',  component: SolicitudEditComponent},
      ]},
      {  path: 'repartidor',  component: RepartidorComponent,
      children: [
        {  path: '',  component: RepartidorIndexComponent},
        {  path: 'index',  component: RepartidorIndexComponent},
        {  path: 'create',  component: RepartidorCreateComponent},
        {  path: 'edit/:id',  component: RepartidorEditComponent},
      ]},
      {  path: 'cliente',  component: ClienteComponent,
      children: [
        {  path: '',  component: ClienteIndexComponent},
        {  path: 'index',  component: ClienteIndexComponent},
        {  path: 'create',  component: ClienteCreateComponent},
        {  path: 'edit/:id',  component: ClienteEditComponent},
      ]},
      {  path: 'usuario',  component: UsuarioComponent,
      children: [
        {  path: '',  component: UsuarioIndexComponent},
        {  path: 'index',  component: UsuarioIndexComponent},
        {  path: 'create',  component: UsuarioCreateComponent},
        {  path: 'edit/:id',  component: UsuarioEditComponent},
      ]},
      {  path: 'empresa',  component: EmpresaComponent,
      children: [
        {  path: '',  component: EmpresaIndexComponent},
        {  path: 'index',  component: EmpresaIndexComponent},
        {  path: 'create',  component: EmpresaCreateComponent},
        {  path: 'edit/:id', component: EmpresaEditComponent},
      ]},
      {  path: 'producto',  component: ProductoComponent,
      children: [
        {  path: '',  component: ProductoIndexComponent},
        {  path: 'index',  component: ProductoIndexComponent},
        {  path: 'create',  component: ProductoCreateComponent},
        {  path: 'edit/:id', component: ProductoEditComponent},
      ]},
      {  path: 'presentacion',  component: PresentacionComponent,
      children: [
        {  path: '',  component: PresentacionIndexComponent},
        {  path: 'index',  component: PresentacionIndexComponent},
        {  path: 'create',  component: PresentacionCreateComponent},
        {  path: 'edit/:id', component: PresentacionEditComponent},
      ]},
      {  path: 'beneficios',  component: BeneficioComponent,
      children: [
        {  path: '',  component: BeneficioIndexComponent},
        {  path: 'index',  component: BeneficioIndexComponent},
        {  path: 'create',  component: BeneficioCreateComponent},
        {  path: 'edit/:id',  component: BeneficioEditComponent},
      ]},
      {  path: 'noticias',  component: NoticiaComponent,
      children: [
        {  path: '',  component: NoticiaIndexComponent},
        {  path: 'index',  component: NoticiaIndexComponent},
        {  path: 'create',  component: NoticiaCreateComponent},
        {  path: 'edit/:id',  component: NoticiaEditComponent},
      ]},
      {  path: '',  component: DashboardComponent}
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NonAuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NonAuthGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
