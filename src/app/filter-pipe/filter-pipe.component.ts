import { compileNgModuleFromRender2 } from '@angular/compiler/src/render3/r3_module_compiler';
import { Component, OnInit } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import {  Trip } from '../trips';


@Pipe({ name: 'filterPreference'})
export class filterPreference implements PipeTransform {

 transform(tours: Array<Trip>, filterData: FilterData): Array<Trip>{

  if (!tours || tours.length == 0)
    return [];
 
  tours = tours.filter(tour => filterData.country ? tour.country === filterData.country : true); 
  tours = tours.filter(tour => filterData.minVal ? tour.price >= filterData.minVal : true); 
  tours = tours.filter(tour => filterData.maxVal ? tour.price <= filterData.maxVal : true);
  tours = tours.filter(tour => filterData.start_date ? tour.start_date >= filterData.start_date : true);
  tours = tours.filter(tour => filterData.end_date ? tour.end_date <= filterData.end_date : true);
  tours = tours.filter(tour => filterData.evaluation ? tour.evaluation >= filterData.evaluation : true);
  return tours;
 };
}

export interface FilterData {
 country: string | null,
 minVal: number | null,
 maxVal: number | null,
 start_date: Date | null,
 end_date: Date | null,
 evaluation: number | null
}