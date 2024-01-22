import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  selectedOptions: any[] = [];

  constructor() { }

  guardarDetalle(options: any[]): void {
    this.selectedOptions = options;
  }
}
