import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/models/empresa';
import { environment } from 'src/environments/environment.prod';
import { LoginService } from 'src/app/login/login.service';
import { ToastrService } from 'ngx-toastr';
import { Noticia } from 'src/app/models/noticia.models';
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
    private noticiaService: NoticiaService,
    private loginService: LoginService
  ) {
    this.token = this.loginService.getToken();
  }

  ngOnInit(): void {
     this. getnoticias();
  }

  getnoticias() {
    this.noticiaService.getNoticias(this.token).subscribe(response => {
        this.noticias = response;
        this.cols = [
            { field: 'id', header: 'ID' },
            { field: 'establecimiento_id', header: 'Establecimiento' },
            { field: 'titulo', header: 'Titulo' },
            { field: 'detalle', header: 'Detalle' }
        ];
    }, error => {
      console.log(error);
    });
  }

  selectCarWithButton(noti: Noticia) {
    console.log(noti.id);
  }

  deleteNoticia(id) {
    this.noticiaService.delete(this.token, id).subscribe(response => {
        this.toastr.success('Ok.', 'Noticia Eliminada');
        this. getnoticias();
    }, error => {
      this.toastr.error('Uppp!', 'verifique los valores');
    });
  }
}


