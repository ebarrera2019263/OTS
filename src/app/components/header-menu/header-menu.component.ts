import { Component } from '@angular/core';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent {
  // Agrega una propiedad para controlar la visibilidad del menú en pantallas pequeñas
  isMenuVisible = false;

  // Método para alternar la visibilidad del menú
  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }
}
