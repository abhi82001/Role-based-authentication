import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firebase:AngularFireDatabase) { }
  studentlist?:AngularFireList<any>;

  form = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
    location: new FormControl(''),
  })

  getStudents(){
    this.studentlist = this.firebase.list('users');
    return this.studentlist.snapshotChanges();
  }
  insertStudents(student: any){
    this.studentlist?.push({
      fullName: student.fullName,
      email: student.email,
      mobile:student.mobile,
      location: student.location
    })
  }
}
