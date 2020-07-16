import { Component, OnInit, OnDestroy } from '@angular/core';
import { DocumentosService } from '../servicios/documentos.service';
import { Documentos } from '../modelos/documentos';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss']
})
export class DocumentosComponent implements OnInit, OnDestroy {

  documento: Documentos;
  private _docSub: Subscription;
  constructor(private documentosServices: DocumentosService) { }

  ngOnInit(): void {
    this._docSub = this.documentosServices.documentoActual.pipe(
      startWith({id: '', doc: 'Seleccione un documento o cree uno nuevo', date: null})
    ).subscribe(documento =>{
      this.documento = documento
    });
  }

  ngOnDestroy(){
    this._docSub.unsubscribe();
  }

  editDoc = () => {
    this.documentosServices.editDoc(this.documento)
  }

}
