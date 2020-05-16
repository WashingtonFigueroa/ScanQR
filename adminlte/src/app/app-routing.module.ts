import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './utils/guards/auth.guard';
import { NonAuthGuard } from './utils/guards/non-auth.guard';

import { UsuarioComponent } from './pages/usuario/usuario.component';
import { UsuarioIndexComponent } from './pages/usuario/usuario-index/usuario-index.component';
import { UsuarioCreateComponent } from './pages/usuario/usuario-create/usuario-create.component';
import { UsuarioEditComponent } from './pages/usuario/usuario-edit/usuario-edit.component';

import { EmpresaComponent } from './pages/empresa/empresa.component';
import { EmpresaIndexComponent } from './pages/empresa/empresa-index/empresa-index.component';
import { EmpresaCreateComponent } from './pages/empresa/empresa-create/empresa-create.component';
import { EmpresaEditComponent } from './pages/empresa/empresa-edit/empresa-edit.component';

import { CargoComponent } from './pages/cargo/cargo.component';
import { CargoIndexComponent } from './pages/cargo/cargo-index/cargo-index.component';
import { CargoEditComponent } from './pages/cargo/cargo-edit/cargo-edit.component';
import { CargoCreateComponent } from './pages/cargo/cargo-create/cargo-create.component';

import { QrComponent } from './pages/qr/qr.component';
import { QrIndexComponent } from './pages/qr/qr-index/qr-index.component';
import { QrEditComponent } from './pages/qr/qr-edit/qr-edit.component';
import { QrCreateComponent } from './pages/qr/qr-create/qr-create.component';

import { ReportesComponent } from './pages/reportes/reportes.component';


const routes: Routes = [
  {
    path: '', component: MainComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard],
    children: [
      {  path: 'usuario',  component: UsuarioComponent,
      children: [
        {  path: '',  component: UsuarioIndexComponent},
        {  path: 'index',  component: UsuarioIndexComponent},
        {  path: 'create',  component: UsuarioCreateComponent},
        {  path: 'edit/:id',  component: UsuarioEditComponent},
      ]},
      {  path: 'cargo',  component: CargoComponent,
      children: [
        {  path: '',  component: CargoIndexComponent},
        {  path: 'index',  component: CargoIndexComponent},
        {  path: 'create',  component: CargoCreateComponent},
        {  path: 'edit/:id', component: CargoEditComponent},
      ]},
      {  path: 'qr',  component: QrComponent,
      children: [
        {  path: '',  component: QrIndexComponent},
        {  path: 'index',  component: QrIndexComponent},
        {  path: 'create',  component: QrCreateComponent},
        {  path: 'edit/:id', component: QrEditComponent},
      ]},
        {  path: 'empresa',  component: EmpresaComponent,
      children: [
        {  path: '',  component: EmpresaIndexComponent},
        {  path: 'index',  component: EmpresaIndexComponent},
        {  path: 'create',  component: EmpresaCreateComponent},
        {  path: 'edit/:id', component: EmpresaEditComponent},
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
