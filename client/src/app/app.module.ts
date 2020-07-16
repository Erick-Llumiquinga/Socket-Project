import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { ListaDocumentosComponent } from './lista-documentos/lista-documentos.component';
import { SocketIoModule,SocketIoConfig } from 'ngx-socket-io';
import { FormsModule } from '@angular/forms';
import { SocketJwtService } from './servicios/socket-jwt.service';
import { LoginComponent } from './login/login.component';

//const config: SocketIoConfig = {url: 'http://localhost:3500', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    DocumentosComponent,
    ListaDocumentosComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    //SocketIoModule.forRoot(config)
    SocketIoModule
  ],
  providers: [SocketJwtService],
  bootstrap: [AppComponent]
})
export class AppModule { }
