import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs' 
import { DocumentosService } from '../servicios/documentos.service';

@Component({
  selector: 'app-lista-documentos',
  templateUrl: './lista-documentos.component.html',
  styleUrls: ['./lista-documentos.component.scss']
})
export class ListaDocumentosComponent implements OnInit, OnDestroy {

  documentos: Observable<string[]>
  actualDoc: string;
  private _docSub: Subscription

  constructor(private documentoService: DocumentosService) { }

  ngOnInit(): void {
    this.documentos = this.documentoService.docs
    this._docSub = this.documentoService.documentoActual.subscribe(doc => this.actualDoc = doc.id)
  }

  ngOnDestroy() {
    this._docSub.unsubscribe();
  }

  readDoc = (id: string) => {
    this.documentoService.getDoc(id)
  }

  newDoc = () => {
    this.documentoService.newDoc();
  }

}
