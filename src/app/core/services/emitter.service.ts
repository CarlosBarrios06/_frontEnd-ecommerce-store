import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmitterService {

  @Output() showSidenav: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() getIdentification: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }
}
