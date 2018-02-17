import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ESTRUCTURA_AGREGAR_USUARIO, MENSAJES_AGREGAR_USUARIO } from '../_constants/agregar-usuario';
import { Clase } from '../../clases/models/clase';
import { Subject } from 'rxjs/Subject';
import { UsuariosService } from '../_services/usuarios.service';
import { ValidacionService } from '../../core/validacion.service';
import { DialogService } from '../../core/dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import AppMessages from '../../_utils/AppMessages';
import { GUARDAR, GENERIC_ERROR_MESSAGE } from '../../app-constants';
import { Rol } from '../../seguridad/_models/rol';
import { Usuario } from '../_models/usuario';
import { Observable } from 'rxjs/Observable';
import { switchMap, takeUntil } from 'rxjs/operators';
import { SeguridadService } from '../../seguridad/_services/seguridad.service';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { of } from 'rxjs/observable/of';

const ENTIDAD = 'El usuario';

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
    this.defineMode();
    this.createForm();
    this.initializeValidationService();
    this.fetchResources();
  }

  handleSubmit(): void {
    if (this.form.valid) {
        this.dialogService.confirm(AppMessages.confirm(ENTIDAD, GUARDAR)).then(_ => {
            this.showLoader = true;
            const value = this.form.value;
            const $usuario = this.editar ?
                this.usuariosService.editarUsuario(this.idUsuario, value) :
                this.usuariosService.guardarUsuario(value);
            $usuario.subscribe(this.onSuccess.bind(this)(GUARDAR), this.onError.bind(this));
        }, cancel => {});
    } else {
        this.validacionService.showErrors(this.form);
    }
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
      this.editar = url[1].path === 'editar' ? true : false;
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
        this.dialogService.success(AppMessages.success(ENTIDAD, accion)).then(_ => {
          if (!this.editar) {
            this.router.navigate(['/usuarios']);
          }
        });
        this.showLoader = false;
    };
  }

  private onError(res): void {
    this.dialogService.error(res.error.clientMessage || GENERIC_ERROR_MESSAGE);
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

  ngOnDestroy() {
    this.$destroy.next(true);
    this.$destroy.unsubscribe();
  }
}
