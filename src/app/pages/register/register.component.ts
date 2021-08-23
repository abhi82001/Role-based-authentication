import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/_helpers/must-match.validator';
import { validate } from 'json-schema';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  selectedValue?: string;
  hide = true;
  hidden = true;
  registerForm!: FormGroup;
  submitted!: boolean;

  constructor(public authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      option: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }
  get f() { return this.registerForm.controls; }
  // onRegister(){
  //   // this.submitted = true;

  //   // // stop here if form is invalid
  //   // if (this.registerForm.invalid) {
  //   //     return;
  //   // }

  //   // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  // }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  }
}
