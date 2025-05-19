import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    constructor(private productService: ProductService, private cartService: CartService){}
    products:any[] = []

    ngOnInit(): void {
        this.productService.getproducts().subscribe((res:any) => {
            // console.log("products", res)
            const productArray = []
            for(const key in res){
                if(res.hasOwnProperty(key)){
                    productArray.push({id: key, ...res[key]});
                }
            }
            this.products = productArray
        })
    }

    addTocart(item: any){
        this.cartService.addToCart(item);
    }

}
