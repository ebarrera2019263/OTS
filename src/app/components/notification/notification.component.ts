import { Component } from '@angular/core';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  showNotification$ = this.notificationService.showNotification$;

  constructor(private notificationService: NotificationService) {}
}
