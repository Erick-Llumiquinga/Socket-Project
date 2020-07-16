import { Injectable } from '@angular/core';
import { SocketJwtService } from './socket-jwt.service';
import { Documentos } from '../modelos/documentos';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  count = 0;
  documentoActual = this.socket.fromEvent<Documentos>('gestionDato');
  docs = this.socket.fromEvent<string[]>('gestionDatos');

  constructor(private socket:SocketJwtService ) { }

  getDoc = (id: string) => {
    this.socket.emit('getDoc', id)
  }

  newDoc = () => {
    console.log(this.socket)
    if(this.socket.ioSocket.connected){
      this.socket.emit('addDoc', {id: this.docId(), doc: ''})
    } else {
      alert('Token no valido')
    }
    
  }

  editDoc = (doc: Documentos) => {
    this.socket.emit('editDoc', doc)
  }

  private docId = () =>{
    this.count ++;
    const text = `documento ${this.count}`
    return text;
  }
}
