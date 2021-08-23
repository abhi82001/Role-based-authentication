import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }
//   onSubmit(){
    
//   this.auth.signInWithEmailAndPassword(this.credentials.username, this.credentials.password)
//   .then((userCredential: { user: any; }) => {
//     // Signed in
//     var user = userCredential.user;
//     // ...
//   })
//   .catch((error: { code: any; message: any; }) => {
//     var errorCode = error.code;
//     var errorMessage = error.message;
//   });
// }

// logout() {
//   this.auth.signOut();
// }
// login(){
//   //this.auth.signInWithEmailAndPassword(email, password)
// }
}

