import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-agregar-clases',
  templateUrl: './agregar-clases.component.html',
  styleUrls: ['./agregar-clases.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AgregarClasesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  open(a) {
    console.log(a);
  }

}
