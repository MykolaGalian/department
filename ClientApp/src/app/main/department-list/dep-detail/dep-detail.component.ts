import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DepartmentService } from '../../../shared/department.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dep-detail',
  templateUrl: './dep-detail.component.html',
  styleUrls: ['./dep-detail.component.css']
})
export class DepDetailComponent implements OnInit {

  constructor(private serviceDep: DepartmentService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm(); // нужна инициализация обьекта класса DepartmentClass (т.к. при введения логина произв. инициализация EmployeeClass)
  }



  resetForm(form?: NgForm) {    // метод для очистки формы с записями  - вызывается из представления

    if (form != null) form.form.reset(); //очистка полей в форме если был передан обьект формы
    this.serviceDep.formDataDep = {   // установка пустых значений для полей
      DepartmentId: 0,
      DepartName: "",
      Employee: null,
      PositionDepartments: null,
      StaffRestrict: null
    }
  }

  onSubmit(form: NgForm) {
    if (this.serviceDep.formDataDep.DepartmentId == 0) this.insertRecord(form); // добавление нового обьекта в бд если скрытое поле Id =0 в представлении (ввод новой должности)
    else this.updateRecord(form);                     // обновление выбранного обьекта в бд в противном случае


  }

  updateRecord(form: NgForm) {  // обновление выбранного обьекта в бд web ip

    this.serviceDep.putDepartmentDetail().subscribe(
      res => {
        this.resetForm(form);                           // если все удачно отправлено, то очищаем поля временного класса
        this.toastr.info('Зміни збережено', 'Зміна назви відділу'); // и высвечиваем сообщение о удачном сохранении
        this.serviceDep.refreshListDep();   // обновление списка   из бд    
      },

      err => { console.log(err) }    // если ошибки, выводим в консоль
    )

  }


  insertRecord(form: NgForm) {   // добавление нового обьекта в бд

    this.serviceDep.postDepartmentDetail().subscribe(
      res => {
        this.resetForm(form);                           // если все удачно отправлено, то очищаем поля временного класса
        this.toastr.success('Зміни збережено', 'Додавання нового відділу');     // и высвечиваем сообщение о удачном сохранении
        this.serviceDep.refreshListDep();   // обновление списка
      },

      err => { console.log(err) }    // если ошибки, выводим в консоль
    )
  }

}
