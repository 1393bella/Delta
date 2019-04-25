import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ContactComponent } from './contact/contact.component';
import { HistoryComponent } from './history/history.component';

import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { config } from './config'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ViewComponent,
    NewComponent,
    EditComponent,
    ContactComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: config['GOOGLE_MAP_API_KEY']
      /* apiKey is required, unless you are a 
      premium customer, in which case you can 
      use clientId 
      */
    })
  ],


  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
