import { Injectable, NgZone } from '@angular/core';
import { User } from './shared/services/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  userData?: firebase.User;
  GoogleAuthProvider: any;
  currentUserValue: any;
  // firestore: any;
  // public currentUser?: any;
  // public userStatus! : any;
  // public userStatusChanges: BehaviorSubject<string> = new BehaviorSubject<string>(this.userStatus);

  constructor(
    public afs: AngularFirestore, //Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning 
    
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') || '{}');
      } else {
        localStorage.setItem('user', null!);
        JSON.parse(localStorage.getItem('user') || '{}');
      }
    })
  }
  

  // setUserStatus(userStatus:any):void {
  //   this.userStatus = userStatus;
  //   this.userStatusChanges?.next(userStatus);
  // }

   // Sign in with email/password
   SignIn(email: any, password: any){
     return this.afAuth.signInWithEmailAndPassword(email,password)
     .then((result)=> {
       this.ngZone.run(()=> {
         this.router.navigate(['/dashboard']);
       });
       this.SetUserData(result.user);
     }).catch((error)=>{
       window.alert(error.message)
     });
   }
  //  Sign up
  
  //  SignUp(email :string, password:string){
  //    this.afAuth.createUserWithEmailAndPassword(email, password)
  //    .then((userResponse)=> {
  //     //add the user to the users database
  //     let user ={
  //       id:userResponse.user?.uid,
  //       username: userResponse.user?.email,
  //       role: "user",
  //     }

  //     //add the user to the database
  //     this.firestore.collection("users").add(user)
  //     .then((user: { get: () => Promise<any>; }) => {
  //       user.get().then(x => {
  //         console.log(x.data());
  //         this.currentUser = x.data();
  //         this.setUserStatus(this.currentUser);
  //         this.router.navigate(["ngouser"])
  //       })
  //     }).catch((err: any) => {
  //       console.log(err);
  //     })
  //    }).catch((err)=> {
  //      console.log("An error ocurred:", err);
  //    } )
  //  }


   //Sign up with email/password

   SignUp(email:string, password:string) {
     return this.afAuth.createUserWithEmailAndPassword(email, password)
     .then((result)=>{
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.ngZone.run(()=>{
          this.router.navigate(['/login'])
        })
        this.SetUserData(result.user);
     }).catch((error)=>{
       window.alert(error.message)
     })
   }

   //Send email verification when new user sign up
   async SendVerificationMail() {
     const user = await this.afAuth.currentUser
     user?.sendEmailVerification()
     .then(()=>{
       this.router.navigate(['verify-email-address']);
     })
   }

 
  // //  Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new this.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider:any){
    return this.afAuth.signInWithPopup(provider)
    .then((result)=>{
      this.ngZone.run(() =>{
        this.router.navigate(['/dashboard']);
      })
      this.SetUserData(result.user);
    }).catch((error)=>{
      window.alert(error)
    })
  }

    /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
SetUserData(user:any) {
const userRef:AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
const userData: User ={
 uid:user.uid,
 email:user.email
}
return userRef.set(userData, {
  merge:true
})
}
//Rest Forgot password
ForgotPassword(passwordResentEmail: any){
return this.afAuth.sendPasswordResetEmail(passwordResentEmail)
.then(()=> {
  window.alert('Password reset email sent, Check your inbox.');
}).catch((error)=>{
  window.alert(error)
})
}


// Returns true when user is looged in and email is verified
get isLoggedIn(): boolean {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return (user !== null ) ? true : false;
}


  

// Sign out 
SignOut() {
  return this.afAuth.signOut().then(() => {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  })
}

}
