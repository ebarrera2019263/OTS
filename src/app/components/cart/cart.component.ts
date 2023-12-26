import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  myCart$ = this.productService.myCart$


  constructor(private productService : ApiService,private router: Router) { }

  ngOnInit(): void {
      
  }

  irComponent() {

    this.router.navigate(['/checkout']);
   
  }


  returnCart(){
    this.router.navigate(['/products']);
  }

}
