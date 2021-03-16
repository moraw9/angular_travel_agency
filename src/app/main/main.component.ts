
import { Component, OnInit} from '@angular/core';
import { Trip } from '../trips';
import { FilterData } from '../filter-pipe/filter-pipe.component';
import { ToursService } from '../services/tours.service';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

// interface Role {
//   uid: string;
//   role: string;
// }

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  tours: Array <any> = [];
  isLoggedIn = false;
  role: string= '';
 
 
  constructor(
    private toursService: ToursService,
    private authService: AuthService
    ) {
    
      this.authService.authState$.subscribe(auth => {

        if(auth) {
          this.isLoggedIn = true;
          authService.getUserRoles$().subscribe(users =>{
            const filteredRole = users.filter(role => role.uid === auth.uid);
            this.role = filteredRole[0].role;
          });

        } else {
          this.isLoggedIn = false;
          this.role = '';
        }
      });
    };

  public count = 0;

  reservedtoursCounter: number = 0;
  redBg: string = "#EF5350";
  greenBg: string ="#A3F45F";
  minPrice: number= 100000000000000;
  maxPrice: number= 0;
  filterData: FilterData = {
    country: null,
    minVal: null,
    maxVal: null,
    start_date: null,
    end_date: null,
    evaluation: null
  };

  ngOnInit() {
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
      this.clearFilter();
      this.checkMinMaxPrices();

    });
    
  }

  checkMinMaxPrices() {
    this.minPrice= 100000000000000;
    this.maxPrice = 0;
  
    this.tours.forEach((tour: Trip) => {
      if(tour.price < this.minPrice)
       this.minPrice = tour.price;

      if(tour.price > this.maxPrice)
      this.maxPrice = tour.price;
      
    });

  }
  
  setFilter(filterData: FilterData): void {
    this.filterData = filterData;
  }

  clearFilter() {
    this.filterData = {
      country: null,
      minVal: null,
      maxVal: null,
      start_date: null,
      end_date: null,
      evaluation: null
    };
  }

  public reserveTour(tour: Trip): void{
    tour.reserverdSeats ++;
    this.reservedtoursCounter ++;
  }

  public removeReservation(tour: Trip): void{
    tour.reserverdSeats --;
    this.reservedtoursCounter --;
  }

  public removeTour(tourToDelete: Trip): void{
    this.reservedtoursCounter-=tourToDelete.reserverdSeats;
    this.toursService.deleteTour(tourToDelete.key);

    this.checkMinMaxPrices();

  }

  
}
  