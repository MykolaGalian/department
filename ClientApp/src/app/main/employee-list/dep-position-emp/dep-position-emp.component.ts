import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../shared/employee.service';
import { EmployeeClass } from '../../../shared/employee-class.model';
import { ToastrService } from 'ngx-toastr';
import { PositionService } from '../../../shared/position.service';
import { DepartmentService } from '../../../shared/department.service';

@Component({
  selector: 'app-dep-position-emp',
  templateUrl: './dep-position-emp.component.html',
  styleUrls: ['./dep-position-emp.component.css']
})
export class DepPositionEmpComponent implements OnInit {

  constructor(private serviceEmp: EmployeeService, private toastr: ToastrService, private serviceDep: DepartmentService,
    private servicePos: PositionService) { }

  ngOnInit() {
    this.serviceEmp.empList = [];   // очистка массива сотрудников (оставшийся от других запросов)  
  }

  populateForm(pd: EmployeeClass) {       // метод обновляет данные во временном обьекте (service.formDataEmp) типа EmployeeClass на основании обьекта выделенного из списка pd в представлении
    this.serviceEmp.formDataEmp = Object.assign({}, pd);   // Object.assign - предотвращает корректировку полей в
  }


  onDelete(EmployeeId) {   // удаление выбранного в списке обьекта из бд

    if (confirm('Ви хочете видалити співробітника?')) {

      this.serviceEmp.deleteEmpoleey(EmployeeId)
        .subscribe(

          res => {

            //обновить запрос о острудниках в текущем отделе и на текущей должности
            //вызов списка сотрудников на выбранной должности в выбраном отделе по Id отдела и должности (через сервис EmployeeService) - список в сервисе  EmployeeService в списке empList
            this.serviceEmp.getEmpInDepPos(this.serviceDep.formDataDep.DepartmentId, this.servicePos.formDataPos.PositionId);

            this.toastr.info('Видалено успішно', 'Співробітники відділу');
            this.serviceEmp.refreshListEmpDetail(); // очистка полей после удаления
          },

          err => {
            console.log(err);
          })
    }
  }


}
