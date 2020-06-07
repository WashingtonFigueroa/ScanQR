import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor(private oneSignal: OneSignal) { }

  configuracionInicial() {
    this.oneSignal.startInit('b2f7f966-d8cc-11e4-bed1-df8f05be55ba', '703322744261');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    this.oneSignal.handleNotificationReceived().subscribe((noticia) => {
      console.log('Noti recibida ', noticia);
    });
    this.oneSignal.handleNotificationOpened().subscribe((notia) => {
      console.log('Noti abierta ', notia);
    });
    this.oneSignal.endInit();
  }
}
