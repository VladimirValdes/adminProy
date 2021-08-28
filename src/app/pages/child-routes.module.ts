import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';



// Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { UserProfileComponent } from './user-profile/user-profile.component';



// Mantenimientos 
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedasComponent } from './busquedas/busquedas.component';

// Guards
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';


const childRoutes: Routes = [

            { path: '', component: DashboardComponent, data: { titulo: 'Dashboard'} },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress'} },
            { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Grafica #1'} },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Account Settings'} },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'} },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs'} },
            { path: 'profile', component: UserProfileComponent, data: { titulo: 'Profile'} },
            { path: 'buscar/:termino', component: BusquedasComponent, data: { titulo: 'Busqueda'} },


            // Mantenimientos
            { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Hospitales de App'} },
            { path: 'medicos', component: MedicosComponent, data: { titulo: 'Medicos de App'} },
            { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Medico de App'} },

            // Admin 
            { path: 'usuarios', canActivate:[AdminGuard], component: UsuariosComponent, data: { titulo: 'Usuarios de App'} }

]


@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [ RouterModule ]
})

export class ChildRoutesModule { }
