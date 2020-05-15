import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { LoginService } from 'src/app/login/login.service';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from '../producto.service';
import { Producto } from '../../../models/producto';

@Component({
  selector: 'app-producto-index',
  templateUrl: './producto-index.component.html',
  styleUrls: ['./producto-index.component.scss']
})
export class ProductoIndexComponent implements OnInit {
public base = environment.servidor;
public token;
public productos: Producto;
public cols: any[];

constructor(
  private toastr: ToastrService,
  private productoService: ProductoService,
  private loginService: LoginService
) {
  this.token = this.loginService.getToken();
}

ngOnInit(): void {
   this. getproductos();
}

getproductos() {
  this.productoService.index().subscribe(response => {
    console.log(response.status);
    if (response.status === 'success') {
      this.productos = response.productos;
      this.cols = [
          { field: 'empresa.nombre', header: 'Empresa' },
          { field: 'nombre', header: 'Nombre' },
          { field: 'valor', header: 'Valor' }
      ];
    } else {
      console.log('error');
    }
  }, error => {
    console.log(error);
  });
}

selectCarWithButton(car: Producto) {
  console.log(car.producto_id);
}

deleteProducto(id) {
  this.productoService.delete(this.token, id).subscribe(response => {
    if (response.status === 'success') {
      this.toastr.success('Ok.', 'Producto Eliminado');
      this. getproductos();
    } else {
      this.toastr.error('Uppp!', response.message);
    }
  }, error => {
    this.toastr.error('Uppp!', 'comuniquese con el Administrador');
  });
}
}


