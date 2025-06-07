import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ClothingComponent } from './pages/clothing/clothing.component';
import { HomeDecorComponent } from './pages/home-decor/home-decor.component';
import { ProductComponent } from './pages/product/product.component';
import { ShopcarComponent } from './pages/shopcar/shopcar.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
    {path:'', component:HomeComponent},
    {path: 'shop', component:ClothingComponent},
    {path: 'homeDecor', component:HomeDecorComponent},
    {path : 'productInfo/:id', component:ProductComponent},
    {path: 'car', component:ShopcarComponent},
    {path: 'login', component:LoginComponent},
    {path: 'register', component:RegisterComponent}
];
