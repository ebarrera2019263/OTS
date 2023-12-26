import { Component ,  OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  myClient$  = this.ApiService.myClient$
  myCart$ = this.ApiService.myCart$

  constructor(private ApiService : ApiService,  private router: Router) { }

  ngOnInit(): void {
  }

  addToCart(product: Product) {
    return this.ApiService.addProduct(product);
  }


  returnCart(){
    this.router.navigate(['/products']);
  }

}
