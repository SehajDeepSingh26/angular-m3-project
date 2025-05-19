import { Injectable, OnInit } from '@angular/core';
import { ProductService } from './product.service';

@Injectable({
    providedIn: 'root'
})
export class CartService implements OnInit{
    private cart: any[] = []
    constructor(private products: ProductService) {
        const storedcart = localStorage.getItem("cart");
        if (storedcart) {
            this.cart = JSON.parse(storedcart);
        }
    }
    ngOnInit(): void {
        
    }

    getCart() {
        const storedcart = localStorage.getItem("cart");
        if (storedcart) {
            this.cart = JSON.parse(storedcart);
        }
        return [...this.cart]
    }

    addToCart(item: any) {
        const index = this.cart.findIndex(i => i.id === item.id);
        // console.log(this.cart)

        this.products.getproductQty(item.id).subscribe((res: any) => {
            if (res.qty > 0) {
                if (index !== -1)
                    this.cart[index].qty++;
                else
                    this.cart.push({ ...item, qty: 1 });
                this.products.updateProductQty(item.id, -1).subscribe() //update inventory in backend
                localStorage.setItem("cart", JSON.stringify(this.cart))
            }
            else{
                alert("Product is out of stock")
            }

        })

    }

    clearCart() {
        localStorage.removeItem("cart")
        this.cart = []
    }
}
