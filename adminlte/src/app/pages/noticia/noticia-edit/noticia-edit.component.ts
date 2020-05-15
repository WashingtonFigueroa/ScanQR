import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/models/empresa';
import { environment } from 'src/environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/login/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpresaService } from '../../empresa/empresa.service';
import { Producto } from 'src/app/models/producto';
import { Noticia } from 'src/app/models/noticia';
import { NoticiaService } from '../noticia.service';

@Component({
  selector: 'app-noticia-edit',
  templateUrl: '../noticia-create/noticia-create.component.html',
  styleUrls: ['../noticia-create/noticia-create.component.scss']
  // templateUrl: './noticia-edit.component.html',
  // styleUrls: ['./noticia-edit.component.scss']
})
export class NoticiaEditComponent implements OnInit {
  public title: string;
  public empresas: Empresa;
  public noticia: Noticia;
  public noticia_id: number;
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
    private route: ActivatedRoute,
    private loginService: LoginService,
    private noticiaService: NoticiaService,
    private empresaService: EmpresaService
  ) {
    this.title = 'Editar Noticia';
    this.identity = this.loginService.getIdentity();
    this.token = this.loginService.getToken();
    this.noticia = new Noticia (1, 1, 1, '', '', '', '', '', 1);

    this.route.params.subscribe((param: any) => {
      this.noticia_id = param.id;
      this.noticiaService.show(this.noticia_id)
          .subscribe((res: any) => {
              this.noticia = res.noticia;
          });
  });

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
    this.noticiaService.update(this.token, this.noticia, this.noticia.noticia_id).subscribe(response => {
      if (response.status === 'success') {
        this.toastr.success('Ok.', 'Datos Actualizados');
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
