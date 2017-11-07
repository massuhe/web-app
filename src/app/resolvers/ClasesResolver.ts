import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';

@Injectable()
export class ClasesResolver implements Resolve<any> {

  constructor(private router: Router) {}

  resolve() {
      const rol = false;
      if (rol) {
        this.router.navigate(['/clases/alumno']);
      }
  }
}
