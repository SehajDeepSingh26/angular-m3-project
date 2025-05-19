import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
    cartItems: any[] = []
    total = 0

    constructor(
        private cartService: CartService,
        private orderService: OrdersService,
        private productService: ProductService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.cartItems = this.cartService.getCart();
        this.calculateTotal();
    }

    calculateTotal() {
        this.total = this.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    }

    placeOrder() {
        this.orderService.placeOrder(this.cartItems, this.total).subscribe(() => {
            this.cartService.clearCart();
            this.router.navigate(['/orders'])
        })
    }

    removeItem(index: number) {
        this.productService.updateProductQty(this.cartItems[index].id, this.cartItems[index].qty).subscribe()
        this.cartItems.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(this.cartItems))
        this.calculateTotal();
    }
    increaseQty(index: number) {
        this.productService.getproductQty(this.cartItems[index].id).subscribe((res: any) => {
            if (res.qty > 0) {
                this.cartItems[index].qty++;
                this.cartService.addToCart(this.cartItems[index])
                this.calculateTotal();
                this.cartItems[index].qty--;
            }
        })
    }
    decreaseQty(index: number) {
        if (this.cartItems[index].qty === 1)
            this.removeItem(index)
        else {
            this.cartItems[index].qty--;
            this.productService.updateProductQty(this.cartItems[index].id, 1).subscribe()
            localStorage.setItem("cart", JSON.stringify(this.cartItems))
            this.calculateTotal();
        }
    }
}
