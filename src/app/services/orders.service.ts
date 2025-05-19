import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { ProductService } from './product.service';

const dbUrl = environment.firebaseConfig.dbUrl;

@Injectable({
    providedIn: 'root'
})

export class OrdersService {
    
    constructor(private auth: AuthService, private http: HttpClient) { }

    placeOrder(items: any[], total: number){
        const uid = this.auth.getUid();
        const order = {
            items,
            total,
            date: new Date().toISOString(),
            status: "Placed"
        };
        //for admin
        this.http.post(`${dbUrl}/manageorder/${uid}.json`, order).subscribe();

        return this.http.post(`${dbUrl}/orders/${uid}.json`, order)
    }

    getOrders(){
        const uid = this.auth.getUid();
        return this.http.get(`${dbUrl}/orders/${uid}.json`);
    }
    getManageOrders(){
        return this.http.get(`${dbUrl}/manageorder.json`);
    }

    updateOrderStatus(uid:string, orderId: string, updatedOrder: any){
        
        //^ update in manageOrder
        this.http.put(`${dbUrl}/manageorder/${uid}/${orderId}.json`, updatedOrder).subscribe()

        //^ update in user's order
        return this.http.put(`${dbUrl}/orders/${uid}/${orderId}.json`, updatedOrder)
    }
}
