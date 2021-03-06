import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { PageComponent } from './pages/page.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MycardsComponent } from './pages/mycards/mycards.component';
import { HistoryComponent } from './pages/history/history.component';
import { PayComponent } from './pages/pay/pay.component';
import { GuardGuard } from '../app/services/guard.guard' 
import { RegalarComponent } from './pages/regalar/regalar.component';

const routes: Routes = [

  { path:'',
   component:PageComponent,
   canActivate:[GuardGuard],
  children:[
    { path:'home', component:HomeComponent },
    { path:'profile', component:ProfileComponent },
    { path:'mycards', component:MycardsComponent },
    { path:'history', component:HistoryComponent },
    { path:'pay', component:PayComponent },
    { path:'regalar', component:RegalarComponent },
    { path:'', redirectTo: '/home', pathMatch: 'full' }
  ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NopagefoundComponent }

];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})

export class AppRoutingModule{}

//export const APP_ROUTES = RouterModule.forRoot(routes,{useHash:true});
