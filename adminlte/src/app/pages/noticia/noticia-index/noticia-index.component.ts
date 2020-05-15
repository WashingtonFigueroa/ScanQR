import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { LoginService } from 'src/app/login/login.service';
import { ToastrService } from 'ngx-toastr';
import { Noticia } from 'src/app/models/noticia';
import { NoticiaService } from '../noticia.service';

@Component({
  selector: 'app-noticia-index',
  templateUrl: './noticia-index.component.html',
  styleUrls: ['./noticia-index.component.scss']
})
export class NoticiaIndexComponent implements OnInit {
  public base = environment.servidor;
  public token;
  public noticias: Noticia;
  public cols: any[];

  constructor(
    private toastr: ToastrService,
    private noticiaservice: NoticiaService,
    private loginService: LoginService
  ) {
    this.token = this.loginService.getToken();
  }

  ngOnInit(): void {
     this. getnoticias();
  }

  getnoticias() {
    this.noticiaservice.index().subscribe(response => {
      if (response.status === 'success') {
        this.noticias = response.noticias;
        this.cols = [
            { field: 'noticia_id', header: 'ID' },
            { field: 'empresa_id', header: 'Empresa' },
            { field: 'user_id', header: 'Usuario' },
            { field: 'imagen', header: 'Foto' },
            { field: 'nombre', header: 'Noticia' },
            { field: 'detalle', header: 'Detalle' },
            { field: 'fecha_ini', header: 'Fecha Inicio' },
            { field: 'fecha_fin', header: 'Fecha Fin' },
            { field: 'estado', header: 'Estado' }
        ];
      } else {
        console.log('error');
      }
    }, error => {
      console.log(error);
    });
  }

  deleteNoticia(id) {
    this.noticiaservice.delete(this.token, id).subscribe(response => {
      if (response.status === 'success') {
        this.toastr.success('Ok.', 'Noticia Eliminada');
        this. getnoticias();
      } else {
        this.toastr.error('Uppp!', response.message);
      }
    }, error => {
      this.toastr.error('Uppp!', 'comuniquese con el Administrador');
    });
  }


}


