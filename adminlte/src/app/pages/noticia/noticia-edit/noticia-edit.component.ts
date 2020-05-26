import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/login/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Noticia } from 'src/app/models/noticia.models';
import { NoticiaService } from '../noticia.service';
import { EmpresaService } from '../../empresa/empresa.service';
import { Empresa } from 'src/app/models/empresa';

@Component({
  selector: 'app-noticia-edit',
  templateUrl: '../noticia-create/noticia-create.component.html',
  styleUrls: ['../noticia-create/noticia-create.component.scss']
  // templateUrl: './noticia-edit.component.html',
  // styleUrls: ['./noticia-edit.component.scss']
})
export class NoticiaEditComponent implements OnInit {
  public title: string;
  public noticia: Noticia;
  public empresas: Empresa;
  public id: number;
  public identity;
  public token;
  public base = environment.servidor;
  public today: Date;
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
      selectFileBtn: 'Sube imagen de perfil',
      resetBtn: 'limpiar',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube tu imagen de perfil...',
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
    private establecimientoService: EmpresaService
  ) {
    this.title = 'Editar Noticia';
    this.identity = this.loginService.getIdentity();
    this.token = this.loginService.getToken();
    this.noticia = new Noticia (1, 1, '', '', '', '', 1);
    this.today = new Date();

    this.route.params.subscribe((param: any) => {
      this.id = param.id;
      this.noticiaService.show(this.token, this.id)
          .subscribe((res: any) => {
              this.noticia = res;
          });
    });
  }

  avatarUpload(datos) {
    const data = JSON.parse(datos.response);
    this.noticia.image = data.image;
  }

  resetVar() {}

  ngOnInit(): void {
    this.getEmpresas();
  }
   onSubmit(form) {
    let date = JSON.stringify(this.today);
    date = date.slice(1, 11);
    this.noticia.fecha_fin  = date;
    this.noticiaService.update(this.token, this.noticia, this.noticia.id).subscribe(response => {
        this.toastr.success('Ok.', 'Datos Actualizados');
        form.reset();
        this.router.navigate(['/noticia']);
    }, error => {
      this.toastr.error('Uppp!', 'verifique los valores');
    });
  }

  getEmpresas() {
    this.establecimientoService.getEstablecimientos(this.token).subscribe(response => {
        this.empresas = response;
    }, error => {
      console.log(error);
    });
  }
}
