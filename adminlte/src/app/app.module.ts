import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AngularFileUploaderModule} from 'angular-file-uploader';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {NgSelectModule} from '@ng-select/ng-select';
import {CalendarModule} from 'primeng/calendar';

import {AppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import {LoginComponent} from './login/login.component';
import {HeaderComponent} from './main/header/header.component';
import {FooterComponent} from './main/footer/footer.component';
import {MenuSidebarComponent} from './main/menu-sidebar/menu-sidebar.component';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegisterComponent} from './register/register.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {ToastrModule} from 'ngx-toastr';
import {MessagesDropdownMenuComponent} from './main/header/messages-dropdown-menu/messages-dropdown-menu.component';
import {NotificationsDropdownMenuComponent} from './main/header/notifications-dropdown-menu/notifications-dropdown-menu.component';

import {UsuarioComponent} from './pages/usuario/usuario.component';
import {UsuarioIndexComponent} from './pages/usuario/usuario-index/usuario-index.component';
import {UsuarioCreateComponent} from './pages/usuario/usuario-create/usuario-create.component';
import {UsuarioEditComponent} from './pages/usuario/usuario-edit/usuario-edit.component';

import {EmpresaComponent} from './pages/empresa/empresa.component';
import {EmpresaIndexComponent} from './pages/empresa/empresa-index/empresa-index.component';
import {EmpresaCreateComponent} from './pages/empresa/empresa-create/empresa-create.component';
import {EmpresaEditComponent} from './pages/empresa/empresa-edit/empresa-edit.component';

import {ReportesComponent} from './pages/reportes/reportes.component';

import {CargoComponent} from './pages/cargo/cargo.component';
import {CargoIndexComponent} from './pages/cargo/cargo-index/cargo-index.component';
import {CargoEditComponent} from './pages/cargo/cargo-edit/cargo-edit.component';
import {CargoCreateComponent} from './pages/cargo/cargo-create/cargo-create.component';

import {QrComponent} from './pages/qr/qr.component';
import {QrIndexComponent} from './pages/qr/qr-index/qr-index.component';
import {QrEditComponent} from './pages/qr/qr-edit/qr-edit.component';
import {QrCreateComponent} from './pages/qr/qr-create/qr-create.component';
import {ZXingScannerModule} from '@zxing/ngx-scanner';
import { QRCodeModule } from 'angularx-qrcode';
import {TooltipModule} from 'primeng';
import { CupoComponent } from './pages/cupo/cupo.component';
import { CupoIndexComponent } from './pages/cupo/cupo-index/cupo-index.component';
import { CupoEditComponent } from './pages/cupo/cupo-edit/cupo-edit.component';
import { CupoCreateComponent } from './pages/cupo/cupo-create/cupo-create.component';
import { NoticiaComponent } from './pages/noticia/noticia.component';
import { NoticiaIndexComponent } from './pages/noticia/noticia-index/noticia-index.component';
import { NoticiaEditComponent } from './pages/noticia/noticia-edit/noticia-edit.component';
import { NoticiaCreateComponent } from './pages/noticia/noticia-create/noticia-create.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ClienteIndexComponent } from './pages/cliente/cliente-index/cliente-index.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    MenuSidebarComponent,
    RegisterComponent,
    DashboardComponent,
    MessagesDropdownMenuComponent,
    NotificationsDropdownMenuComponent,
    UsuarioComponent,
    UsuarioIndexComponent,
    UsuarioCreateComponent,
    UsuarioEditComponent,
    EmpresaComponent,
    EmpresaIndexComponent,
    EmpresaCreateComponent,
    EmpresaEditComponent,
    ReportesComponent,
    CargoComponent,
    CargoIndexComponent,
    CargoEditComponent,
    CargoCreateComponent,
    QrComponent,
    QrIndexComponent,
    QrEditComponent,
    QrCreateComponent,
    CupoComponent,
    CupoIndexComponent,
    CupoEditComponent,
    CupoCreateComponent,
    NoticiaComponent,
    NoticiaIndexComponent,
    NoticiaEditComponent,
    NoticiaCreateComponent,
    ClienteComponent,
    ClienteIndexComponent,
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
        CalendarModule,
        ZXingScannerModule,
        QRCodeModule,
        TooltipModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
