import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit{
    orders:any[] = []
    manageOrders:any[] = []
    isAdmin:boolean = false;
    changedStatus: string = "Placed"

    constructor(private orderService: OrdersService, private auth: AuthService) {}

    ngOnInit(): void {
        this.orderService.getOrders().subscribe((data:any) => {
            const orderArray = []
            for(const key in data){
                if(data.hasOwnProperty(key))
                    orderArray.push({id: key, ...data[key]});
            }
            this.orders = orderArray
            console.log(orderArray)
        })

        this.isAdmin = this.auth.isAdmin()

        this.orderService.getManageOrders().subscribe((data:any) => {
            const manageOrderArray = []
            for(const userid in data){
                if(data.hasOwnProperty(userid)){
                    const userOrders = data[userid];
                    for(let orderid in userOrders){
                        if(userOrders.hasOwnProperty(orderid)){
                            manageOrderArray.push({id: orderid, 
                                uid:userid, 
                                ...userOrders[orderid]});
                        }
                    }
                }   
            }
            this.manageOrders = manageOrderArray
        })
    }

    changeStatus(){
        console.log(this.changedStatus)
    }
}
