import { Component, OnInit, ViewEncapsulation, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SesionComponent implements OnInit {

  @Input() isLogged: boolean;
  @Input() usuario: string;
  @Output() onLogout = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  emitLogout(a) {
    this.onLogout.emit();
  }

}
