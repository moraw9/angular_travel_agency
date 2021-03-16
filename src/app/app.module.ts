import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { environment } from '../environments/environment';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { ModelFormComponent } from './model-form/model-form.component';
import { filterPreference } from './filter-pipe/filter-pipe.component';
import { PipeContolerComponent } from './pipe-contoler/pipe-contoler.component';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { UpgradeTripComponent } from './upgrade-trip/upgrade-trip.component';


import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    ModelFormComponent,
    filterPreference,
    PipeContolerComponent,
    UpgradeTripComponent,
    LoginComponent,
    HomePageComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig ),
    AngularFirestoreModule,
    AngularFireAuthModule, // do obsługi autentykacji
    AngularFireDatabaseModule // do obslugi baz danych
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);