
import { Component } from '@angular/core';
import {

  FormGroup,
  FormControl,
  Validators,

} from "@angular/forms";
import { ToursService } from '../services/tours.service';
import { Trip } from '../trips';

@Component({
  selector: 'model-form',
  templateUrl: './model-form.component.html',
  styleUrls: ['./model-form.component.css']
})
export class ModelFormComponent {

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
  
  constructor(private toursService: ToursService){
  
    this.name = new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z]+$')]);
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
 
  
  submitForm(myForm: FormGroup): void{
    if (!(new Date(myForm.value['start_date']) <= new Date(myForm.value['end_date']))){
      alert('Data rozpoczęcia jest większa od daty zakończenia, wprowadź poprawną datę!');
      return;
    }
    const newTrip = new Trip(
      null,
      myForm.value['name'],
      myForm.value['country'],
      new Date(myForm.value['start_date']),
      new Date(myForm.value['end_date']),
      myForm.value['price'],
      myForm.value['capacity'],
      myForm.value['description'],
      myForm.value['link']
    );

    this.myForm.reset();
    this.addTour(newTrip);
    alert('Gratulacje, dodano wycieczkę do listy');

  }

  addTour(newT: any): void{
    this.toursService.createTour(newT);
  
  }
 
  
}
