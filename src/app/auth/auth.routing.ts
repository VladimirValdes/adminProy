import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoggedGuard } from '../guards/logged.guard';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';



const routes: Routes = [
    
    { path: 'login',  component: LoginComponent, canActivate: [ LoggedGuard ]  },
    { path: 'register', component: RegisterComponent, canActivate: [ LoggedGuard ] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
