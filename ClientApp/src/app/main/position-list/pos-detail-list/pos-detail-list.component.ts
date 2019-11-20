import { Component, OnInit } from '@angular/core';

import { PositionService } from '../../../shared/position.service';
import { PositionClass } from '../../../shared/position-class.model';

@Component({
  selector: 'app-pos-detail-list',
  templateUrl: './pos-detail-list.component.html',
  styleUrls: ['./pos-detail-list.component.css']
})
export class PosDetailListComponent implements OnInit {

  constructor(private servicePos: PositionService ) { }

  ngOnInit() {
    this.servicePos.refreshListPos();  // при обращении к компоненту - вызов метода - запрос GET - получение списка обьектов из бд
   
  }

  populateForm(pd: PositionClass) {       // метод обновляет данные во временном обьекте (servicePos.formDataPos) типа PositionClass на основании обьекта выделенного из списка pd в представлении
    this.servicePos.formDataPos = Object.assign({}, pd);   // Object.assign - предотвращает корректировку полей в списке обьектов PositionService posList
  } 

}
