import { Component, OnInit, ViewChild } from '@angular/core';
import { FiltersComponent } from '../filters/filters.component';
import { positionInfo, filterInfo, BackendCommService } from '../backend-comm.service';
import {TableModule} from 'primeng/table';

@Component({
	selector: 'app-positions-page-component',
	templateUrl: './positions-page-component.component.html',
	styleUrls: ['./positions-page-component.component.css']
})

export class PositionsPageComponentComponent implements OnInit {

    // Local Variables
    cols: any[];
    currentPositions: positionInfo[];
    currentFilters: filterInfo[];
    formatedFilters: string[];

    title: string;
    selectedPosition: positionInfo;
    position: positionInfo;
    newPosition: boolean;
    displayDialog: boolean;
    filtersDialog: boolean;
    showAddRequirements: boolean;

    constructor(private service: BackendCommService) {
    	this.title = "Position Management Software";
    	this.currentPositions = [];
    	this.filtersDialog = false;
    	this.showAddRequirements = false;
    	this.displayDialog = false;
    	this.position = {name: '', requirements:[]};
    }

    hideFilters(){
    	this.filtersDialog = false;
    }

    formatFilters() {
    	this.formatedFilters = [];
    	for (var i = 0; i < this.currentFilters.length; i++) {
    		for (var j = 0; j < this.currentFilters[i].details.length; j++) {
    			this.formatedFilters.push(this.currentFilters[i].name + " - " + this.currentFilters[i].details[j]);
    		}
    	}
    }

    updateFilters(event){
    	console.log("New Filters");
    	console.log(event);
    	this.currentFilters = this.service.getFilters();
    	this.formatFilters();
    	//this.currentFilters = event;
    }

    showDialogToAdd() {
    	this.newPosition = true;
    	this.position = {title:"",startDate:new Date(), endDate:new Date(), requirements:[], location:""};
    	this.displayDialog = true;
    }

    showFiltersDialog() {
    	console.log("Show Filters Window");
    	this.filtersDialog = true;
    }

    onPositionSelect(event) {
    	this.newPosition = false;
    	this.position = this.clonePosition(event.data);
    	this.displayDialog = true;
    }

    updatePostings(event) {
    	console.log(event);
    	for (var i = 0; i < this.currentPositions.length- 1; i++) {
    		for (var j=0; j < this.currentPositions[i].requirements.length; j++) {
    			console.log(this.currentPositions[i].requirements[j]);
    			if (this.currentPositions[i].requirements[j] == event){
    				this.currentPositions[i].requirements = this.currentPositions[i].requirements.splice(j,1);
				}
    		}
    	}
    }

    clonePosition(p: positionInfo): positionInfo {
    	let pos: positionInfo = {title:"",startDate:new Date(), endDate:new Date(), requirements:[], location:""};
    	for (let prop in p) {
    		pos[prop] = p[prop];
    	}
    	return pos;
    }

    savePosition() {
    	let positions = [...this.currentPositions];

    	if (this.newPosition)
    		positions.push(this.position);
    	else
    		positions[this.currentPositions.indexOf(this.selectedPosition)] = this.position;

    	this.currentPositions = positions;
    	this.service.updatePositions(this.currentPositions);
    	//this.position = null;
    	this.displayDialog = false;
    }

    deletePosition() {
    	let index = this.currentPositions.indexOf(this.selectedPosition);
    	this.currentPositions = this.currentPositions.filter((val, i) => i != index);
    	//this.position = null;
    	this.displayDialog = false;
    }

    pickRequirements(position) {
    	this.showAddRequirements = true;
    }

    ngOnInit() {

    	this.currentFilters = this.service.getFilters();
    	this.formatFilters();
    	this.currentPositions = this.service.getCurrentPositions();

    	this.cols = 
    	[
	    	{field: 'title', header: 'Title'},
	    	{field: 'startDate', header: 'Start Date'},
	    	{field: 'endDate', header: 'End Date'},
	    	{field: 'requirements', header: 'Qualifications'},
	    	{field: 'location', header: 'Location'},
    	];
    }
}
