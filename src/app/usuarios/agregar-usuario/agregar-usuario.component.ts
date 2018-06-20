import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ESTRUCTURA_AGREGAR_USUARIO, MENSAJES_AGREGAR_USUARIO } from '../_constants/agregar-usuario';
import { Clase } from '../../clases/models/clase';
import { Subject } from 'rxjs/Subject';
import { UsuariosService } from '../_services/usuarios.service';
import { ValidacionService } from '../../core/validacion.service';
import { DialogService } from '../../core/dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import AppMessages from '../../_utils/AppMessages';
import { GUARDAR, GENERIC_ERROR_MESSAGE, ENTIDADES } from '../../app-constants';
import { Rol } from '../../seguridad/_models/rol';
import { Usuario } from '../_models/usuario';
import { Observable } from 'rxjs/Observable';
import { switchMap, takeUntil } from 'rxjs/operators';
import { SeguridadService } from '../../seguridad/_services/seguridad.service';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { of } from 'rxjs/observable/of';
import GenericValidators from '../../shared/_validators/GenericValidators';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AgregarUsuarioComponent implements OnInit, OnDestroy {

  form: FormGroup;
  cargando = false;
  errors: any;
  roles: Rol[];
  showLoader: boolean;
  editar: boolean;
  idUsuario: number;
  $destroy = new Subject<boolean>();

  get passwordGroup(): AbstractControl {
    return this.form.get('passwordGroup');
  }

  constructor(
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService,
    private seguridadService: SeguridadService,
    private validacionService: ValidacionService,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.roles = [];
    this.createForm();
    this.defineMode();
    this.initializeValidationService();
    this.fetchResources();
  }

  handleSubmit(): void {
    if (!this.form.valid) {
      this.validacionService.showErrors(this.form);
      return ;
    }
    this.dialogService.confirm(AppMessages.confirm(ENTIDADES.USUARIO, GUARDAR)).then(
      _ => {
        this.showLoader = true;
        const {passwordGroup: {password}, ...rest} = this.form.value;
        const value = {...rest, password};
        const $usuario = this.editar ?
            this.usuariosService.editarUsuario(this.idUsuario, value) :
            this.usuariosService.guardarUsuario(value);
        $usuario.subscribe(this.onSuccess.bind(this)(GUARDAR), this.onError.bind(this));
      },
      cancel => {}
    );
  }

  private fetchResources(): void {
    this.showLoader = true;
    combineLatest(this.fetchRoles(), this.fetchUsuario()).pipe(
      takeUntil(this.$destroy)
    )
    .subscribe(result => {
      this.roles = result[0];
      this.updateForm(result[1]);
      this.showLoader = false;
    },
    res => this.onError(res));
  }

  private updateForm(usuario: Usuario): void {
    if (!usuario) {
      return;
    }
    this.idUsuario = usuario.id;
    this.form.patchValue({
        'email': usuario.email,
        'nombre':  usuario.nombre,
        'apellido': usuario.apellido,
        'domicilio': usuario.domicilio,
        'telefono': usuario.telefono,
        'rol': usuario.rol ? usuario.rol.id : undefined
    });
  }

  private defineMode(): void {
    this.route.url.subscribe(url => {
      this.editar = url[1].path === 'agregar' ? false : true;
      if (!this.editar) {
        this.addPasswordControl();
      }
    });
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
        'email': ['', { updateOn: 'blur', validators: [Validators.required, Validators.email] }],
        'nombre': ['', { updateOn: 'blur', validators: [Validators.required] }],
        'apellido': ['', { updateOn: 'blur', validators: [Validators.required] }],
        'domicilio': ['', { updateOn: 'blur', validators: [] }],
        'telefono': ['', { updateOn: 'blur', validators: [Validators.required, Validators.pattern(/^\d+$/)] }],
        'rol' : []
    });
  }

  private onSuccess(accion: string): any {
    return res => {
        this.dialogService.success(AppMessages.success(ENTIDADES.USUARIO, accion)).then(_ => {
          if (!this.editar) {
            this.router.navigate(['/usuarios']);
          }
        });
        this.showLoader = false;
    };
  }

  private onError(res): void {
    this.dialogService.error(AppMessages.error(res));
    this.showLoader = false;
  }

  private fetchUsuario(): Observable<Usuario> {
    return this.route.params.pipe(
        switchMap(p => this.getUsuario(+p['idUsuario']))
    );
  }

  private getUsuario(idUsuario: number): Observable<Usuario> {
    if (!idUsuario) {
      return of(null);
    }
    this.showLoader = true;
    return this.usuariosService.getById(idUsuario);
  }

  private initializeValidationService(): void {
    this.validacionService.inicializa(
      ESTRUCTURA_AGREGAR_USUARIO,
      MENSAJES_AGREGAR_USUARIO
    );
    this.validacionService
      .getErrorsObservable(this.form)
      .subscribe(newErrors => {
        this.errors = newErrors;
      });
  }

  private fetchRoles(): Observable<Rol[]> {
    return this.seguridadService.getRoles();
  }

  private addPasswordControl(): void {
    const passwordGroup = new FormGroup(
      {
        password: new FormControl('', { updateOn: 'blur', validators: [Validators.required, Validators.min(6)] }),
        passwordConfirm: new FormControl('', { updateOn: 'blur' })
      },
      { validators: [GenericValidators.matchFields(['password', 'passwordConfirm'])], updateOn: 'blur' }
    );
    this.form.addControl('passwordGroup', passwordGroup);
  }

  ngOnDestroy() {
    this.$destroy.next(true);
    this.$destroy.unsubscribe();
  }
}
