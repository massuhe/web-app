import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-noticias-paginator',
  templateUrl: './noticias-paginator.component.html',
  styleUrls: ['./noticias-paginator.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NoticiasPaginatorComponent implements OnInit {

  @Input() total: number;
  @Input() currentPage: number;
  @Input() itemsPerPage: number;
  @Output() onPageChange = new EventEmitter<number>();

  get isFirstPage(): boolean {
    return this.currentPage === 0;
  }

  get isLastPage(): boolean {
    const maxPage = Math.ceil(this.total / this.itemsPerPage) - 1;
    return this.currentPage === maxPage;
  }

  constructor() { }

  ngOnInit() {
  }

}
