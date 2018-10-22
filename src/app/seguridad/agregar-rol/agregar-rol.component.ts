import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Permiso } from '../_models/permiso';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SeguridadService } from '../_services/seguridad.service';
import { ValidacionService } from '../../core/validacion.service';
import { DialogService } from '../../core/dialog.service';
import { GENERIC_ERROR_MESSAGE, GUARDAR, ACTUALIZAR, ENTIDADES } from '../../app-constants';
import { finalize, switchMap, takeUntil } from 'rxjs/operators';
import { MENSAJES_AGREGAR_ROL, ESTRUCTURA_AGREGAR_ROL } from '../_constants/agregar-rol';
import AppMessages from '../../_utils/AppMessages';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Rol } from '../_models/rol';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { combineLatest } from 'rxjs/observable/combineLatest';

@Component({
  selector: 'app-agregar-rol',
  templateUrl: './agregar-rol.component.html',
  styleUrls: ['./agregar-rol.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AgregarRolComponent implements OnInit, OnDestroy {

  permisos: Permiso[];
  permisosFilter: Permiso[];
  permisosSeleccionados: number[];
  editar: boolean;
  showLoader: boolean;
  form: FormGroup;
  errors: any;
  idRol: number;
  $destroy = new Subject<boolean>();

  constructor(
    private seguridadService: SeguridadService,
    private formBuilder: FormBuilder,
    private validationService: ValidacionService,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.initValidationService();
    this.fetchPermisos();
    this.defineMode();
    this.fetchResources();
    this.fetchRol();
  }

  handleSubmit(): void {
    if (this.form.valid) {
      this.dialogService.confirm(AppMessages.confirm(ENTIDADES.ROL, GUARDAR)).then(
        ok => {
          this.showLoader = true;
          const value = {...this.form.value, permisos: this.permisosSeleccionados};
          const $rol = this.editar ? this.seguridadService.editarRol(this.idRol, value) : this.seguridadService.guardarRol(value);
          $rol.pipe(finalize(() => this.showLoader = false))
            .subscribe(this.onSuccess.bind(this), this.onError.bind(this));
        }
      , cancelar => {});
    }
  }

  selectPermiso(checked: boolean, idPermiso: number): void {
    if (checked) {
      this.permisosSeleccionados = [...this.permisosSeleccionados, idPermiso];
    } else {
      const idBorrar = this.permisosSeleccionados.indexOf(idPermiso);
      this.permisosSeleccionados = [...this.permisosSeleccionados.slice(0, idBorrar), ...this.permisosSeleccionados.slice(idBorrar + 1)];
    }
  }

  filterData(value): void {
    const filterText = value.toUpperCase();
    this.permisosFilter = this.permisos.filter(
      p => p.nombre.toUpperCase().includes(filterText)
    );
  }

  private fetchResources(): void {
    this.showLoader = true;
    combineLatest(this.fetchPermisos(), this.fetchRol())
      .subscribe(
        results => {
          this.permisos = this.permisosFilter = results[0];
          this.initRol(results[1]);
          this.showLoader = false;
        },
        res => this.onError(res)
      );
  }

  private initRol(rol: Rol): void {
    if (!rol) {
      return ;
    }
    this.idRol = rol.id;
    this.form.patchValue({
      nombre: rol.nombre
    });
    this.permisosSeleccionados = rol.permisos ? rol.permisos.map(p => p.id) : [];
  }

  private fetchRol(): Observable<Rol> {
    return this.route.params.pipe(
      switchMap(p => this.getRol(+p['idRol'])),
      takeUntil(this.$destroy)
    );
  }

  private getRol(idRol: number): Observable<Rol> {
    if (!idRol) {
      return of(null);
    }
    return this.seguridadService.getById(idRol);
  }

  private defineMode() {
    this.route.url.subscribe(url => {
      this.editar = url[1].path === 'agregar' ? false : true;
    });
  }

  private onSuccess(res: any): any {
    const mensaje = this.editar ? ACTUALIZAR : GUARDAR;
    this.dialogService.success(AppMessages.success(ENTIDADES.ROL, mensaje)).then(
      _ => this.editar ? undefined : this.router.navigate(['roles'])
    );
  }

  private onError(res: any): any {
    this.dialogService.error(res.error.clientMessage || GENERIC_ERROR_MESSAGE);
    this.showLoader = false;
  }

  private createForm(): void {
    this.permisosSeleccionados = [];
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required]
    });
  }

  private initValidationService() {
    this.validationService.inicializa(ESTRUCTURA_AGREGAR_ROL, MENSAJES_AGREGAR_ROL);
    this.validationService.getErrorsObservable(this.form)
      .subscribe(newErrors => {
        this.errors = newErrors;
    });
  }

  private fetchPermisos(): Observable<Permiso[]> {
    this.showLoader = true;
    return this.seguridadService.getPermisos();
  }

  ngOnDestroy() {
    this.$destroy.next(true);
    this.$destroy.unsubscribe();
  }

}
