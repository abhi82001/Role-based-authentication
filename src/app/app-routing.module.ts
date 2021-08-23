import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';

import { AuthGuard } from './shared/guard/auth.guard';
import { NgouserComponent } from './usertype/ngouser/ngouser.component';
import { SchooluserComponent } from './usertype/schooluser/schooluser.component';

const routes: Routes = [
  { path: '', component:HomeComponent, pathMatch:'full'},
  { path: 'login', component:LoginComponent, pathMatch:'full'},
  { path: 'dashboard', component:DashboardComponent, pathMatch: 'full', canActivate:[AuthGuard]},
  { path: 'register', component:RegisterComponent, pathMatch:'full'},
  { path: 'forgot-password', component: ForgotPasswordComponent, pathMatch:'full',canActivate:[AuthGuard]},
  { path: 'verify-email-address', component: VerifyEmailComponent, pathMatch:'full',  canActivate:[AuthGuard]},
  { path: 'schooluser', component:SchooluserComponent, pathMatch:'full', canActivate:[AuthGuard] },
  { path: 'ngouser', component:NgouserComponent, pathMatch:'full', canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
