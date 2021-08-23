import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-ngouser',
  templateUrl: './ngouser.component.html',
  styleUrls: ['./ngouser.component.css']
})
export class NgouserComponent implements OnInit {
  

  constructor( public userService: UserService) { }
  
  studentArray: any = [];

  ngOnInit(): void {
    this.userService.getStudents().subscribe(
      list => {
        this.studentArray = list.map(item => {
          return {
            $key : item.key,
            ...item.payload.val()
          }
        })
      }
    )
   
  }


}
