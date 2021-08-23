import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-schooluser',
  templateUrl: './schooluser.component.html',
  styleUrls: ['./schooluser.component.css']
})
export class SchooluserComponent implements OnInit {
submitted?:boolean;
showSuccessMessage:boolean | undefined ;

formControls = this.userService.form.controls;
  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.submitted=true;
    if(this.userService.form.valid){
      if(this.userService.form.get('$key')?.value == null)
        this.userService.insertStudents(this.userService.form.value);
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 3000);  
      this.submitted = false;
      this.userService.form.reset();
    }
  }

}
