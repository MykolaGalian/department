import { Component, OnInit } from '@angular/core';
import { PositionService } from '../../../shared/position.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pos-detail',
  templateUrl: './pos-detail.component.html',
  styleUrls: ['./pos-detail.component.css']
})
export class PosDetailComponent implements OnInit {

  constructor(private servicePos: PositionService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm(); // нужна инициализация обьекта класса PositionClass (т.к. при введения логина произв. инициализация EmployeeClass)
  }



  resetForm(form?: NgForm) {    // метод для очистки формы с записями  - вызывается из представления

    if (form != null) form.form.reset(); //очистка полей в форме если был передан обьект формы
    this.servicePos.formDataPos = {   // установка пустых значений для полей
      PositionId: 0,
      PositionName: "",
      Employee: null,
      PositionDepartments: null,
      StaffRestrict: null
    }
  }

  onSubmit(form: NgForm) {
    if (this.servicePos.formDataPos.PositionId == 0) this.insertRecord(form); // добавление нового обьекта в бд если скрытое поле Id =0 в представлении (ввод новой должности)
    else this.updateRecord(form);                     // обновление выбранного обьекта в бд в противном случае


  }

  updateRecord(form: NgForm) {  // обновление выбранного обьекта в бд web ip

    this.servicePos.putPositionDetail().subscribe(
      res => {
        this.resetForm(form);                           // если все удачно отправлено, то очищаем поля временного класса
        this.toastr.info('Зміни збережено', 'Зміна назви посади'); // и высвечиваем сообщение о удачном сохранении
        this.servicePos.refreshListPos();   // обновление списка   из бд    
      },

      err => { console.log(err) }    // если ошибки, выводим в консоль
    )

  }


  insertRecord(form: NgForm) {   // добавление нового обьекта в бд

    this.servicePos.postPositionDetail().subscribe(
      res => {
        this.resetForm(form);                           // если все удачно отправлено, то очищаем поля временного класса
        this.toastr.success('Зміни збережено', 'Додавання нової посади');     // и высвечиваем сообщение о удачном сохранении
        this.servicePos.refreshListPos();   // обновление списка
      },

      err => { console.log(err) }    // если ошибки, выводим в консоль
    )
  }


}








 

  

 
