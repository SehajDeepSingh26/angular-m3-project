import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OrdersComponent } from './components/orders/orders.component';
import { CartComponent } from './components/cart/cart.component';
import { AdminGuard } from './guards/admin.guard';
import { InventoryComponent } from './components/inventory/inventory.component';

const routes: Routes = [
    {path:'home', component: HomeComponent, canActivate:[AuthGuard]},
    {path:'login', component: LoginComponent},
    {path:'register', component: RegisterComponent,},
    {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
    {path:'orders', component: OrdersComponent, canActivate:[AuthGuard]},
    {path:'cart', component: CartComponent, canActivate:[AuthGuard, AdminGuard]},
    {path:'inventory', component: InventoryComponent, canActivate:[AdminGuard]},
    {path: '**', component: HomeComponent, canActivate:[AuthGuard]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
