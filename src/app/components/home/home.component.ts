import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    constructor(private productService: ProductService, private cartService: CartService){
    }
    products:Product[] = []
    cartItemIds: Set<string> = new Set();

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
        });

        const currcart = this.cartService.getCart();
        this.cartItemIds = new Set(currcart.map(
            (item:any) => item.id
        ))
        console.log(this.cartItemIds)
    }

    addTocart(item: any){
        console.log(item)
        this.cartService.addToCart(item);
        this.cartItemIds.add(item.id)
    }

    isAddedTocart(id: string){
        return this.cartItemIds.has(id)
    }

}
