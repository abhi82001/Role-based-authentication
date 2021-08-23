import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/shared/services/crud.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'Firestore CRUD Operations Students App';




  students: any;
  studentName?: string;
  studentAge?: number;
  studentAddress?: string;
  

  constructor(private crudService: CrudService) { }

  ngOnInit(): void { 
    this.crudService.read_Students().subscribe(data => {
      this.students = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit : false,
          Name: e.payload.doc.data(),//['Name'],
          Age: e.payload.doc.data(),//['Age'],
          Address:e.payload.doc.data()//['Address'],
        };
      })
      console.log(this.students);
    })
  }

  CreateRecord() {
    let record = {
      Name:this.studentName,
      age: this.studentAge,
      address: this.studentAddress
    };
    this.crudService.create_NewStudent(record).then((resp: any) => {
      this.studentName = "";
      this.studentAge = undefined;
      this.studentAddress = "";
      console.log(resp);
    })
      .catch((error: any) => {
        console.log(error);
      });
    alert('Created student record')
  }

}
 
