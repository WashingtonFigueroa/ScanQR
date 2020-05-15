import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/login/login.service';
import { Router } from '@angular/router';
import { EmpresaService } from '../../empresa/empresa.service';
import { Empresa } from 'src/app/models/empresa';
import { NoticiaService } from '../noticia.service';
import { Noticia } from 'src/app/models/noticia';
import { identity } from 'rxjs';
@Component({
  selector: 'app-noticia-create',
  templateUrl: './noticia-create.component.html',
  styleUrls: ['./noticia-create.component.scss']
})
export class NoticiaCreateComponent implements OnInit {
  public title: string;
  public noticia: Noticia;
  public empresas: Empresa;
  public identity;
  public token;
  public base = environment.servidor;
  afuConfig = {
    multiple: false,
    formatsAllowed: '.jpg, .png, .gif',
    maxSize: '50',
    uploadAPI:  {
      url: this.base + 'noticia/upload',
      headers: {
     'Authorization' : this.loginService.getToken()
      }
    },
    theme: 'attachPin',
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: 'Subir imagen Noticia',
      resetBtn: 'limpiar',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Subir imagen Noticia     .',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !'
    }
  };
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private loginService: LoginService,
    private noticiaService: NoticiaService,
    private empresaService: EmpresaService
  ) {
    this.title = 'Crear Noticia';
    this.identity = this.loginService.getIdentity();
    this.token = this.loginService.getToken();
    this.noticia = new Noticia (1, 1, 1, '', '', '', '', '', 1);
  }
  ngOnInit(): void {
    this.getEmpresas();
  }

  avatarUpload(datos) {
    const data = JSON.parse(datos.response);
    this.noticia.imagen = data.logo;
  }

  resetVar() {}

  onSubmit(form) {
    this.noticia.userid = this.identity.sub;
    this.noticiaService.create(this.token, this.noticia).subscribe(response => {
      if (response.status === 'success') {
        this.toastr.success('Ok.', 'Noticia Registrada');
        form.reset();
        this.router.navigate(['/noticias']);
      } else {
        this.toastr.error('Uppp!', response.message);
      }
    }, error => {
      this.toastr.error('Uppp!', 'comuniquese con el Administrador');
    });
  }

  getEmpresas() {
    this.empresaService.getEmpresas().subscribe(response => {
      if (response.status === 'success') {
        this.empresas = response.empresas;
      } else {
        console.log('error');
      }
    }, error => {
      console.log(error);
    });
  }
}
