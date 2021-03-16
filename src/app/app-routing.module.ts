import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { ModelFormComponent } from './model-form/model-form.component';
import { AuthGuard} from './auth.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  { path: '', redirectTo: 'homePage', pathMatch: 'full' },
  {path: 'homePage', component: HomePageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  { path: 'AddTour', component: ModelFormComponent, canActivate: [AuthGuard] },
  {
    path: 'Home',
    component: MainComponent,
    canActivate: [AuthGuard]
  },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
 
})
export class AppRoutingModule { }
