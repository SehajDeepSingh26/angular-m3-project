import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { switchMap } from 'rxjs';

const dbUrl = environment.firebaseConfig.dbUrl;

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private http: HttpClient, private auth: AuthService) { }

    getproducts() {
        return this.http.get(`${dbUrl}/products.json`);
    }

    updateProductQty(id: string, delta: number){
        // console.log("hererrerererer")
        return this.http.get(`${dbUrl}/products/${id}.json`)
        .pipe(
            switchMap((product:any) => {
                const updatedProduct = {...product, qty: (product.qty || 0) + delta}
                return this.http.put(`${dbUrl}/products/${id}.json`, updatedProduct);
            })
        )
    }

    addProduct(name:string, price: number, qty: number, image: string){
        return this.http.post(`${dbUrl}/products.json`, {
            name, price, qty, image
        })
    }

    getproductQty(id: string){
        return this.http.get(`${dbUrl}/products/${id}.json`)
    }
}
