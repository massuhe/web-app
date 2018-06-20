import { Component, OnInit, ViewEncapsulation, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { AlumnosService } from '../services/alumnos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, takeUntil, share } from 'rxjs/operators';
import { Alumno } from '../models/alumno';
import AppMessages from '../../_utils/AppMessages';
import { DialogService } from '../../core/dialog.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { ImagesService } from '../../core/images.service';
import { AuthenticationService } from '../../core/authentication.service';
import { ENTIDADES, GUARDAR } from '../../app-constants';

const AVATAR_PLACEHOLDER = '../../../assets/images/avatar_placeholder.png';

@Component({
  selector: 'app-perfil-alumno',
  templateUrl: './perfil-alumno.component.html',
  styleUrls: ['./perfil-alumno.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class PerfilAlumnoComponent implements OnInit, OnDestroy {

  alumno: Alumno;
  edit: boolean;
  showLoader: boolean;
  showContent: boolean;
  form: FormGroup;
  imagenPerfil: any;
  imageChanged: boolean;
  private destroy$ = new Subject<boolean>();

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alumnoService: AlumnosService,
    private dialogService: DialogService,
    private builder: FormBuilder,
    private imagesService: ImagesService,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.imagenPerfil = AVATAR_PLACEHOLDER;
    this.buildForm();
    this.fetchData();
  }

  handleImageChange(e): void {
    this.imagesService.blobToString(e.target.files[0]).then(url => {
      this.imagenPerfil = url;
      this.imageChanged = true;
    });
  }

  handleEditarDatos(): void {
    if (this.authService.userHasPermission(['VER_PERFIL'])) {
      this.router.navigate([`/alumnos/${this.alumno.usuarioId}/editar`]);
      return ;
    }
    this.edit = true;
  }

  handleCambiarContrasena(): void {
    if (this.authService.userHasPermission(['VER_PERFIL'])) {
      this.router.navigate([`/alumnos/${this.alumno.usuarioId}/cambiarContrasena`]);
      return ;
    }
    this.router.navigate([`/cambiarContrasena`]);
  }

  handleGuardar(): void {
    if (!this.form.valid) {
      return ;
    }
    this.dialogService.confirm(AppMessages.confirm(ENTIDADES.CAMBIOS, GUARDAR, false)).then(
      ok => {
        this.showLoader = true;
        const value = {...this.form.value, imagen: this.imageChanged && this.imagenPerfil};
        const id = this.authService.userHasPermission(['VER_PERFIL']) ? this.alumno.id : undefined;
        this.alumnoService.editarAlumno(id, value).subscribe(
          _ok => this.successGuardar(),
          error => this.handleError(error)
        );
      },
      cancelar => {}
    );
  }

  handleCancelar(): void {
    this.form.patchValue({...this.alumno});
    this.fileInput.nativeElement.value = '';
    this.imagenPerfil = this.alumno.imagenPerfil || AVATAR_PLACEHOLDER;
    this.edit = false;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  private buildForm(): void {
    this.form = this.builder.group({
      nombre: [],
      apellido: [],
      email: [],
      domicilio: [],
      telefono: [],
      tieneAntecDeportivos: [],
      observacionesAntecDeportivos: [],
      tieneAntecMedicos: [],
      observacionesAntecMedicos: []
    });
  }

  private fetchData(): void {
    this.showLoader = true;
    const fetchAlumno$ = this.route.params.pipe(
      switchMap(params => this.alumnoService.getById(params['idAlumno'], {useAlumnoId: true})),
      takeUntil(this.destroy$),
      share()
    );
    fetchAlumno$
      .subscribe(
        (alumno: Alumno) => this.successFetchAlumno(alumno),
        error => this.handleError(error)
      );
    fetchAlumno$
      .pipe(
        switchMap((alumno: Alumno) => this.imagesService.getAvatarAlumno(alumno.imagenPerfil))
      )
      .subscribe(
        avatar => this.successFetchAvatar(avatar),
        error => this.handleError(error)
      );
  }

  private successFetchAlumno(alumno: Alumno): void {
    this.showLoader = false;
    this.showContent = true;
    this.alumno = alumno;
    this.form.patchValue({...alumno});
  }

  private successFetchAvatar(avatar): void {
    if (avatar) {
      this.imagesService.blobToString(avatar).then(url => {
        this.imagenPerfil = url;
        this.alumno.imagenPerfil = url;
      });
    }
  }

  private successGuardar(): void {
    this.showLoader = false;
    this.alumno.domicilio = this.form.value['domicilio'];
    this.alumno.telefono = this.form.value['telefono'];
    this.alumno.imagenPerfil = this.imagenPerfil;
    this.edit = false;
    this.dialogService.success(AppMessages.success(ENTIDADES.CAMBIOS, GUARDAR, false));
  }

  private handleError(error): void {
    this.showLoader = false;
    this.dialogService.error(AppMessages.error(error));
  }

}
