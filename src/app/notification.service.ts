import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private showNotificationSubject = new BehaviorSubject<boolean>(false);
  showNotification$ = this.showNotificationSubject.asObservable();

  showNotification() {
    this.showNotificationSubject.next(true);

    // Opcional: Agregar un temporizador para ocultar la notificación después de un tiempo
    setTimeout(() => {
      this.hideNotification();
    }, 5000); // Ocultar después de 5 segundos (ajusta esto según tus necesidades)
  }

  hideNotification() {
    this.showNotificationSubject.next(false);
  }
}
