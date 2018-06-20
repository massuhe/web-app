import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import GenericValidators from '../_validators/GenericValidators';
import { DialogService } from '../../core/dialog.service';
import { UsuariosService } from '../../usuarios/_services/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidacionService } from '../../core/validacion.service';
import AppMessages from '../../_utils/AppMessages';
import { ENTIDADES, CAMBIAR } from '../../app-constants';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CambiarContrasenaComponent implements OnInit {

  form: FormGroup;
  showLoader: boolean;
  idUsuario: number;

  constructor(
    private dialogService: DialogService,
    private usuariosService: UsuariosService,
    private route: ActivatedRoute,
    private router: Router,
    private validacionService: ValidacionService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => this.idUsuario = params['idUsuario'] ? +params['idUsuario'] : undefined
    );
    this.form = new FormGroup({
      password: new FormControl('', {updateOn: 'blur', validators: [Validators.required, Validators.minLength(6)]}),
      repeatPassword: new FormControl('')
    },
    {
      validators: [GenericValidators.matchFields(['password', 'repeatPassword'])],
      updateOn: 'blur'
    });
  }

  handleConfirmarCambio(): void {
    if (!this.form.valid) {
      this.validacionService.recursiveMarkAsDirty(this.form);
      return ;
    }
    this.dialogService.confirm(AppMessages.confirm(ENTIDADES.CONTRASENA, CAMBIAR, true, false)).then(
      ok => {
        this.showLoader = true;
        const password = this.form.get('password').value;
        this.usuariosService.cambiarContrasena(this.idUsuario, password).subscribe(
          _ => this.successCambiarContrasena(),
          error => this.handleError(error)
        );
      },
      cancelar => {}
    );
  }

  private successCambiarContrasena(): void {
    this.showLoader = false;
    this.dialogService.success(AppMessages.success(ENTIDADES.CONTRASENA, CAMBIAR, true, false))
      .then(_ =>
        this.router.navigate([this.idUsuario ? 'alumnos' : 'perfil'])
      );
  }

  private handleError(error): void {
    this.showLoader = false;
    this.dialogService.error(AppMessages.error(error));
  }

}
