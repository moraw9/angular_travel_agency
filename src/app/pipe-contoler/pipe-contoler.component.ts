import { NgModule,Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { FilterData } from '../filter-pipe/filter-pipe.component';

@Component({
  selector: 'app-pipe-contoler',
  templateUrl: './pipe-contoler.component.html',
  styleUrls: ['./pipe-contoler.component.css']
})
export class PipeContolerComponent  {

  @Output() setFilter = new EventEmitter();
  todayDate = new Date();
  myFilter: FormGroup;


constructor(){
  this.myFilter = new FormGroup({
  country : new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z]*')]),
  start_date: new FormControl("", Validators.required),
  end_date: new FormControl("", Validators.required),
  minVal : new FormControl("", [Validators.required, Validators.pattern('^[1-9][0-9]*')]),
  maxVal : new FormControl("", [Validators.required, Validators.pattern('^[1-9][0-9]*')]),
  evaluation : new FormControl("", [Validators.required, Validators.pattern('^[1-9][0-9]*')]),
  });
}

clearFilter(): void{
  const filterData: FilterData = {
    country:null,
    minVal: null,
    maxVal: null,
    start_date: null,
    end_date: null,
    evaluation: null
  };

  this.setFilter.emit(filterData);
  this.myFilter.reset();

}
  submitForm(myFilter: FormGroup): void{
    if (( myFilter.value['start_date'] && myFilter.value['end_date'] && new Date(myFilter.value['start_date']) > new Date(myFilter.value['end_date']))){
      alert('Data rozpoczęcia jest większa od daty zakończenia, wprowadź poprawną datę!');
      this.myFilter.reset();
      return;
    }
    const filterData: FilterData = {
      country: myFilter.value['country'],
      minVal: myFilter.value['minVal'],
      maxVal: myFilter.value['maxVal'],
      start_date: myFilter.value['start_date'],
      end_date: myFilter.value['end_date'],
      evaluation: myFilter.value['evaluation']
    };

    this.setFilter.emit(filterData);
  }

}
