import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/models/empresa';
import { environment } from 'src/environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/login/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EmpresaService } from '../../empresa/empresa.service';
import { Producto } from 'src/app/models/producto';
import { Presentacion } from 'src/app/models/presentacion';
import { ProductoService } from '../producto.service';
import { PresentacionService } from '../../presentacion/presentacion.service';

@Component({
  selector: 'app-producto-edit',
  templateUrl: '../producto-create/producto-create.component.html',
  styleUrls: ['../producto-create/producto-create.component.scss']
  // templateUrl: './producto-edit.component.html',
  // styleUrls: ['./producto-edit.component.scss']
})
export class ProductoEditComponent implements OnInit {
  public title: string;
  public empresas: Empresa;
  public presentaciones: Presentacion;
  public producto: Producto;
  public productoid: number;
  public identity;
  public token;
  public base = environment.servidor;

  afuConfig = {
    multiple: false,
    formatsAllowed: '.jpg, .png, .gif',
    maxSize: '50',
    uploadAPI:  {
      url: this.base + 'productos/upload',
      headers: {
     'Authorization' : this.loginService.getToken()
      }
    },
    theme: 'attachPin',
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: 'Subir imagen producto',
      resetBtn: 'limpiar',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Subir imagen producto     .',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !'
    }
  };

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private productoService: ProductoService,
    private presentacionService: PresentacionService,
    private empresaService: EmpresaService
  ) {
    this.title = 'Editar Producto';
    this.identity = this.loginService.getIdentity();
    this.token = this.loginService.getToken();
    this.producto = new Producto (1, 1, 1, '', '', '', 0, 0, 0, 0, 1);

    this.route.params.subscribe((param: any) => {
      this.productoid = param.id;
      this.productoService.show(this.productoid)
          .subscribe((res: any) => {
              this.producto = res.producto;
          });
  });

  }
  ngOnInit(): void {
    this.getEmpresas();
    this. getPresentaciones();
  }

  avatarUpload(datos) {
    const data = JSON.parse(datos.response);
    this.producto.imagen = data.imagen;
  }

  resetVar() {}

  onSubmit(form) {
    this.productoService.update(this.token, this.producto, this.producto.producto_id).subscribe(response => {
      if (response.status === 'success') {
        this.toastr.success('Ok.', 'Datos Actualizados');
        form.reset();
        this.router.navigate(['/producto']);
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

  getPresentaciones() {
    this.presentacionService.index().subscribe(response => {
      if (response.status === 'success') {
        this.presentaciones = response.presentaciones;
      } else {
        console.log('error');
      }
    }, error => {
      console.log(error);
    });
  }
}
