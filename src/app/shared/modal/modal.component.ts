import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit {

  @Input() noHeader: boolean;
  @Output() onVisibilityChange = new EventEmitter<boolean>();
  visible: boolean;
  visibleAnimate: boolean;

  constructor() { }

  ngOnInit() {
    this.visible = false;
    this.visibleAnimate = false;
  }

  public show(): void {
    this.visible = true;
    this.onVisibilityChange.emit(true);
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => {
      this.visible = false;
      this.onVisibilityChange.emit(false);
    }, 300);
  }

  // public onContainerClicked(event: MouseEvent): void {
  //   if ((<HTMLElement>event.target).classList.contains('modal')) {
  //     this.hide();
  //   }
  // }

}
