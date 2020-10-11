import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { PageComponent } from './pages/page.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';


const routes: Routes = [

  { path:'',
   component:PageComponent,
  children:[
    { path:'home', component:HomeComponent },
    { path:'profile', component:ProfileComponent },
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
