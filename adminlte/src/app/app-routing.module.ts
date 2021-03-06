import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './main/main.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {AuthGuard} from './utils/guards/auth.guard';
import {NonAuthGuard} from './utils/guards/non-auth.guard';

import {UsuarioComponent} from './pages/usuario/usuario.component';
import {UsuarioIndexComponent} from './pages/usuario/usuario-index/usuario-index.component';
import {UsuarioCreateComponent} from './pages/usuario/usuario-create/usuario-create.component';
import {UsuarioEditComponent} from './pages/usuario/usuario-edit/usuario-edit.component';

import {EmpresaComponent} from './pages/empresa/empresa.component';
import {EmpresaIndexComponent} from './pages/empresa/empresa-index/empresa-index.component';
import {EmpresaCreateComponent} from './pages/empresa/empresa-create/empresa-create.component';
import {EmpresaEditComponent} from './pages/empresa/empresa-edit/empresa-edit.component';

import {CargoComponent} from './pages/cargo/cargo.component';
import {CargoIndexComponent} from './pages/cargo/cargo-index/cargo-index.component';
import {CargoEditComponent} from './pages/cargo/cargo-edit/cargo-edit.component';
import {CargoCreateComponent} from './pages/cargo/cargo-create/cargo-create.component';

import {QrComponent} from './pages/qr/qr.component';
import {QrIndexComponent} from './pages/qr/qr-index/qr-index.component';
import {QrEditComponent} from './pages/qr/qr-edit/qr-edit.component';
import {QrCreateComponent} from './pages/qr/qr-create/qr-create.component';

import {ReportesComponent} from './pages/reportes/reportes.component';
import { CupoComponent } from './pages/cupo/cupo.component';
import { CupoIndexComponent } from './pages/cupo/cupo-index/cupo-index.component';
import { CupoCreateComponent } from './pages/cupo/cupo-create/cupo-create.component';
import { CupoEditComponent } from './pages/cupo/cupo-edit/cupo-edit.component';
import { NoticiaComponent } from './pages/noticia/noticia.component';
import { NoticiaIndexComponent } from './pages/noticia/noticia-index/noticia-index.component';
import { NoticiaCreateComponent } from './pages/noticia/noticia-create/noticia-create.component';
import { NoticiaEditComponent } from './pages/noticia/noticia-edit/noticia-edit.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ClienteIndexComponent } from './pages/cliente/cliente-index/cliente-index.component';
import { PlanComponent } from './pages/plan/plan.component';
import { PlanIndexComponent } from './pages/plan/plan-index/plan-index.component';
import { PlanCreateComponent } from './pages/plan/plan-create/plan-create.component';
import { PlanEditComponent } from './pages/plan/plan-edit/plan-edit.component';
import { PaqueteComponent } from './pages/paquete/paquete.component';
import { PaqueteIndexComponent } from './pages/paquete/paquete-index/paquete-index.component';
import { PaqueteCreateComponent } from './pages/paquete/paquete-create/paquete-create.component';
import { PaqueteEditComponent } from './pages/paquete/paquete-edit/paquete-edit.component';

/*    canActivate: [AuthGuard], canActivateChild: [AuthGuard],*/
const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      {
        path: 'usuario', component: UsuarioComponent,
        children: [
          {path: '', component: UsuarioIndexComponent},
          {path: 'index', component: UsuarioIndexComponent},
          {path: 'create', component: UsuarioCreateComponent},
          {path: 'edit/:id', component: UsuarioEditComponent},
        ]
      },
      {
        path: 'cliente', component: ClienteComponent,
        children: [
          {path: '', component: ClienteIndexComponent},
          {path: 'index', component: ClienteIndexComponent},
        ]
      },
      {
        path: 'cargo', component: CargoComponent,
        children: [
          {path: '', component: CargoIndexComponent},
          {path: 'index', component: CargoIndexComponent},
          {path: 'create', component: CargoCreateComponent},
          {path: 'edit/:id', component: CargoEditComponent},
        ]
      },
      {
        path: 'qr', component: QrComponent,
        children: [
          {path: '', component: QrIndexComponent},
          {path: 'index', component: QrIndexComponent},
          {path: 'create', component: QrCreateComponent},
          {path: 'edit/:id', component: QrEditComponent},
        ]
      },
      {
        path: 'empresa', component: EmpresaComponent,
        children: [
          {path: '', component: EmpresaIndexComponent},
          {path: 'index', component: EmpresaIndexComponent},
          {path: 'create', component: EmpresaCreateComponent},
          {path: 'edit/:id', component: EmpresaEditComponent},
        ]
      },
      {
        path: 'plan', component: PlanComponent,
        children: [
          {path: '', component: PlanIndexComponent},
          {path: 'index', component: PlanIndexComponent},
          {path: 'create', component: PlanCreateComponent},
          {path: 'edit/:id', component: PlanEditComponent},
        ]
      },
      {
        path: 'paquete', component: PaqueteComponent,
        children: [
          {path: '', component: PaqueteIndexComponent},
          {path: 'index', component: PaqueteIndexComponent},
          {path: 'create', component: PaqueteCreateComponent},
          {path: 'edit/:id', component: PaqueteEditComponent},
        ]
      },
      {
        path: 'cupo', component: CupoComponent,
        children: [
          {path: '', component: CupoIndexComponent},
          {path: 'index', component: CupoIndexComponent},
          {path: 'create', component: CupoCreateComponent},
          {path: 'edit/:id', component: CupoEditComponent},
        ]
      },
      {
        path: 'noticia', component: NoticiaComponent,
        children: [
          {path: '', component: NoticiaIndexComponent},
          {path: 'index', component: NoticiaIndexComponent},
          {path: 'create', component: NoticiaCreateComponent},
          {path: 'edit/:id', component: NoticiaEditComponent},
        ]
      },
      {
        path: 'reportes',
        component: ReportesComponent
      },
      {path: 'dashboard', component: DashboardComponent}
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
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
