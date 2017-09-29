import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable()
export class DialogService {
  confirm(message: string, title = 'Confirmaci&oacute;n') {
    return swal({
      title: title,
      text: message,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    });
  }

  error(message: string, title = 'Error') {
    return swal({
      title: title,
      text: message,
      type: 'error'
    });
  }

  success(message: string, title = '&Eacute;xito') {
    return swal({
      title: title,
      text: message,
      type: 'success'
    });
  }
}
