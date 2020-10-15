import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {  AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { HeaderComponent } from './shared/header/header.component';
import { PageComponent } from './pages/page.component';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MycardsComponent } from './pages/mycards/mycards.component';
import { HistoryComponent } from './pages/history/history.component';
import { PayComponent } from './pages/pay/pay.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NopagefoundComponent,
    HeaderComponent,
    PageComponent,
    SidebarComponent,
    ProfileComponent,
    MycardsComponent,
    HistoryComponent,
    PayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
