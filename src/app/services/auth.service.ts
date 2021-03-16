import { Injectable, OnInit } from '@angular/core';
// import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
// import { Observable, switchMap, of } from 'rxjs';
import { Observable } from 'rxjs';
import {auth} from 'firebase/app'; 
// import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

export interface Credentials {
  email: string;
  password: string;
}

interface Role {
  uid: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  readonly authState$: Observable< User | null> = this.fireAuth.authState;
  allUsers: Array <any> = [];
  user: any;
  userRole: string = '';
  rolesRef: AngularFirestoreCollection<Role>;

  constructor(
    private db: AngularFirestore,
    public fireAuth: AngularFireAuth
  ) {
    this.rolesRef = db.collection('/user_roles');
    this.fireAuth.authState.subscribe(auth =>{
        // console.log('zmiana stanu');
        // console.log(auth);
        this.user = auth;

   });
  }
  

   login(type: Number, {email, password}: Credentials){
    let persistance; 
    if(type === 1) {
      persistance = auth.Auth.Persistence.SESSION;
    } else if(type === 2) {
      persistance = auth.Auth.Persistence.LOCAL;
    } else {
      persistance = auth.Auth.Persistence.NONE;
    }
    
 

    return this.fireAuth.setPersistence(persistance).then(() => {
      return this.fireAuth.signInWithEmailAndPassword(email, password).then((data) => {
        // console.log('po zalogowaniu data:', data);
        alert("Zalogowano");
      })
    });

    
   }

   register({email, password}: Credentials){
    return this.fireAuth.createUserWithEmailAndPassword(email, password);
   }
   logout(){
     return this.fireAuth.signOut().then((data) => {
      // console.log('po wylogowaniu data:', data);
      alert("Wylogowano");
     })
    }



    getUserRoles$() {
      return this.rolesRef.snapshotChanges().pipe(
        map(changes => changes.map(c => ({key : c.payload.doc.id, ...c.payload.doc.data()} )))
      );
    }

    // getUserRole(){
    //   return this.userRole;
    // }
}
