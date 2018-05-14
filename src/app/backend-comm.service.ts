import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface filterInfo
{
  name: string;
  details: string[];
}

export interface positionInfo
{
  title: string;
  startDate: Date;
  endDate: Date;
  requirements: string[];
  location: string;
}

@Injectable()
export class BackendCommService {

  filters: filterInfo[] = [];
  positions: positionInfo[] = [];

  constructor(private http: HttpClient) { 
    this.filters.push({
      name: 'Education',
      details: ['High School','Bachelors','Masters','PhD']
    },
    {
      name: 'Work Experience',
      details: ['5','<5','10','10<']
    });

    this.positions.push(
      {
        title: 'Software Engineer',
        startDate: new Date('2018-05-01'),
        endDate: new Date('2018-06-01'),
        location: 'Toronto',
        requirements: []
      },
      {
        title: 'Full Stack Engineer',
        startDate: new Date('2018-08-01'),
        endDate: new Date('2018-10-01'),
        location: 'Waterloo',
        requirements: []
      },
      {
        title: 'Web Engineer',
        startDate: new Date('2018-09-01'),
        endDate: new Date('2018-012-01'),
        location: 'Montreal',
        requirements: []
      });
  }

  getFilters() {
    return this.filters;
  }
  
  updateFilters(filters: filterInfo[]) {
    this.filters = filters;
  }

  getCurrentPositions() {
    return this.positions;
  }

  updatePositions(positions: positionInfo[]) {
    this.positions = positions;
  }
}
