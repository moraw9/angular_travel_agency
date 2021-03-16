import { Component, Input, OnInit } from '@angular/core';
import { Trip } from '../trips';
import { ToursService } from '../services/tours.service';
import { map } from 'rxjs/operators';
import {

  FormGroup,
  FormControl,
  Validators,

} from "@angular/forms";

@Component({
  selector: 'app-upgrade-trip',
  templateUrl: './upgrade-trip.component.html',
  styleUrls: ['./upgrade-trip.component.css']
})
export class UpgradeTripComponent implements OnInit {


  tours: Array <any> = [];
  chosenField: string = '';
  chosenTrip: any;

  todayDate = new Date();

  myForm: FormGroup;
  name: FormControl;
  start_date: FormControl;
  end_date:  FormControl;
  country:  FormControl;
  price:  FormControl;
  capacity:  FormControl;
  description:  FormControl;
  link:  FormControl;
  constructor(private toursService: ToursService) {

    this.name = new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z]*')]);
    this.start_date = new FormControl("", Validators.required);
    this.end_date =  new FormControl("", Validators.required);
    this.country =  new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z]*')]);
    this.price = new FormControl("", [Validators.required, Validators.pattern('^[1-9][0-9]*')]);
    this.capacity =  new FormControl("", [Validators.required, Validators.pattern('^[1-9][0-9]*')]);
    this.description =  new FormControl("", Validators.required);
    this.link =  new FormControl("", Validators.required);


    this.myForm = new FormGroup({
      name : this.name,
      country : this.country,
      start_date: this.start_date, 
      end_date: this.end_date, 
      price : this.price,
      capacity : this.capacity,
      description : this.description,
      link : this.link
    });
   }
 

  ngOnInit(): void {

  this.getToursList();
  }
  

  getToursList(): void{
    this.toursService.getToursList().snapshotChanges().pipe(
      map(changes => changes.map(c => ({key : c.payload.doc.id, ...c.payload.doc.data()} )))
    ).subscribe(tours =>{
      this.tours = tours.map( tour => {
        const startTimestamp = tour.start_date.seconds *1000;
        const newStartDate: Date = new Date(startTimestamp);
        const endTimestamp = tour.end_date.seconds *1000;
        const newEndDate: Date = new Date(endTimestamp);
        return new Trip(tour.key, tour.name, tour.country, newStartDate, newEndDate, tour.price, tour.capacity, tour.description, tour.img_link);
      })
      
    });
  }

  changeTrip(name: any) {

    this.tours.forEach(tour => {
      if(tour.name == name.value){
        this.chosenTrip = new Trip(tour.key, tour.name, tour.country, tour.start_date, tour.end_date, tour.price, tour.capacity, tour.description, tour.img_link);
      }
      
    });
  }
  changeTypeOfData(attribute: any ) {
    this.chosenField = attribute.value;

  }

  exit(): void{
    this.chosenField = '';

  }
  upgrade(myForm: FormGroup): void{
    if(this.chosenField =='start_date')
    if (!(new Date(myForm.value['start_date']) <= this.chosenTrip.end_date )){
      alert('Data rozpoczęcia jest większa od daty zakończenia, wprowadź poprawną datę!');
      return;
    }
    if(this.chosenField =='end_date')
    if (!(new Date(myForm.value['end_date']) > this.chosenTrip.start_date )){
      alert('Data rozpoczęcia jest większa od daty zakończenia, wprowadź poprawną datę!');
      return;
    }
    const tempObject: any = { };
    tempObject[this.chosenField] = myForm.value[this.chosenField];

    this.toursService.updateTour(
      this.chosenTrip.key,
      tempObject
    );
    alert("Zauktualizowano wycieczkę!")
    this.chosenField = '';
  }

}
