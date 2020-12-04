import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { TopTwitsComponent } from './top-twits/top-twits.component';
import { TwitAddComponent } from './twit-add/twit-add.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'user/login',
    component: LoginComponent,
  },
  {
    path: 'user/register',
    component: RegisterComponent,
  },
  {
    path: 'user/:uid',
    component: ProfileComponent,
  },
  {
    path: 'twits/add',
    component: TwitAddComponent,
  },
  {
    path: 'twits/top',
    component: TopTwitsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }