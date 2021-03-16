import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

interface apiDateObject {
  seconds: number;
  nanoseconds: number;
}
  export interface Trip{
    key?: string;
    name: string;
    country: string;
    start_date: apiDateObject; 
    end_date: apiDateObject;
    price: number;
    capacity: number;
    description: string;
    img_link: string;
    reserverdSeats: number;
    evaluation: number;
  }
  @Injectable({
    providedIn: 'root'
  })
  export class ToursService {
  
  
    private dbPath = '/tours';
    toursRef: AngularFirestoreCollection<Trip>;
   
    constructor(private db: AngularFirestore) {
      this.toursRef = db.collection(this.dbPath);
    
    }
  
    createTour(tour: Trip): void {
      this.toursRef.add({
        name: tour.name,
        country: tour.country,
        start_date: tour.start_date,
        end_date: tour.end_date,
        price: tour.price,
        capacity: tour.capacity,
        description: tour.description,
        img_link: tour.img_link,
        reserverdSeats: tour.reserverdSeats,
        evaluation: tour.evaluation 
      });
    }
  
    updateTour(key: string, value: any): Promise<void>{
      return this.toursRef.doc(key).update(value);
     
    }
  
    deleteTour(key: string): Promise <void> {
      return  this.toursRef.doc(key).delete();
   
    }
  
    getToursList(): AngularFirestoreCollection<Trip> {
      return this.toursRef;
    }
  
     deleteAll() {
       this.toursRef.get().subscribe(
        querySnapshot =>{
           querySnapshot.forEach((doc) =>{
             doc.ref.delete();
            });
        },
       )
    }
}
