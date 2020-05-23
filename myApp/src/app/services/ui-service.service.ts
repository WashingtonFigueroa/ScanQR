import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(public alertController: AlertController) { }

  async alertaInformativa( messaje: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: messaje,
      buttons: ['OK']
    });

    await alert.present();
  }
}
