import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html'
})
export class InventoryComponent implements OnInit{
    products:Product[] = []

    name:string = "";
    qty:number | null = null;
    price:number | null = null;
    image: string = ""

    constructor(private productService: ProductService, private auth: AuthService) { }

    ngOnInit(): void {
        this.getProducts();
    }

    getProducts(){
        this.productService.getproducts().subscribe((res: any) => {
            const productArray = []

            for(const key in res){
                if(res.hasOwnProperty(key)){
                    productArray.push({id: key, ...res[key]});
                }
            }
            this.products = productArray;
        })
    }

    increaseQty(id: string){
        this.productService.updateProductQty(id, 1).subscribe(() => {
            this.getProducts();
        })
    }
    decreaseQty(id: string){
        this.productService.updateProductQty(id, -1).subscribe(() => {
            this.getProducts();
        })
    }

    onAddProduct(){
        if(this.name !== "" && this.qty && this.price && this.image){
            this.productService.addProduct(this.name, this.price, this.qty, this.image).subscribe(() => {
                this.getProducts();

                this.name = "";
                this.price = null;
                this.qty = null;
                this.image = "";
            })
        }
    }
}
