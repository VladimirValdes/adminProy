import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Routes
import { AppRoutingModule } from './app-rounting.module';
import { AppComponent } from './app.component';

// Modulos
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';

// Components
import { NopagefoundComponent } from './400/nopagefound.component';




@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
