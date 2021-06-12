import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Modulos
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

import { NopagefoundComponent } from './400/nopagefound.component';



const routes: Routes = [

    // path: '/dashboard' PagesRounting
    // path: 'auth' AuthRounting
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    { path: '**', component: NopagefoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        PagesRoutingModule,
        AuthRoutingModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
