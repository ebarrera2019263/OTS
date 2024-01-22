export class SharedService {
  selectedOptions: any[] = [];
  currentProductId: string = '';

  constructor() { }

  guardarDetalle(productId: string, options: any[]): void {
    this.currentProductId = productId;
    this.selectedOptions = options;
  }
}

