import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { TwitAddComponent } from './twit-add/twit-add.component';
import { TwitComponent } from './twit/twit.component';
import { TwitListComponent } from './twit-list/twit-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { storageServiceProvider } from './services/storage.service';
import { UserService } from './services/user.service';
import { appInterceptorProvider } from './app.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopTwitsComponent } from './top-twits/top-twits.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    TwitAddComponent,
    TwitComponent,
    TwitListComponent,
    TopTwitsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    storageServiceProvider,
    UserService,
    appInterceptorProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
