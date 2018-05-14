import { Component } from '@angular/core';
import { BackendCommService } from './backend-comm.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
	  './app.component.css',
  ] 
})

export class AppComponent
{

  constructor(private backEndService:BackendCommService)
  {

  };

  ngOnInit()
  {
    
  };

  populateServicesList(sList: any[])
  {
    console.log("In the Populate Function");

    //this.servicesList = sList;
    console.log("After");
    //console.log(this.servicesList);
  }; 
};
