import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { filterInfo, BackendCommService } from '../backend-comm.service'

@Component({
	selector: 'app-filters',
	templateUrl: './filters.component.html',
	styleUrls: ['./filters.component.css']
})
export class FiltersComponent {

	@Input() showMe: boolean;
	@Output() filtersChange = new EventEmitter();
	@Output() visibilityChange = new EventEmitter();
	@Output() deleteDetails = new EventEmitter();

	filtersDialog: boolean;
	currentFilters: filterInfo[];
	newCategoryText: string;
	newCategoryVisible: string;
	newDetailText: string;
	newDetailVisible: string;
	categoryIndex: number;
	replacementText: string;
	currentCategory: string;
	currentDetail: string;

	constructor(private service: BackendCommService) { 
		this.filtersDialog = false;
		this.currentFilters = [];
		this.newCategoryText = "";
		this.newCategoryVisible = "hidden";
		this.newDetailText = "";
		this.newDetailVisible = "hidden";
		this.categoryIndex = -1;
		this.replacementText = "";
		this.currentCategory = "";
		this.currentDetail = "";
	}

	ngOnInit() {
		console.log("Filters Component")

		this.currentFilters = this.service.getFilters();
	}

	hideModal() {
		console.log("Hide");
		this.filtersDialog = false;
		this.visibilityChange.emit();
	}

	addCategory() {
		this.newCategoryVisible = "visible";
	}

	saveCategory(event) {
		console.log(this.newCategoryText);
		if (this.newCategoryText != "")
		{
			this.currentFilters.push({name:this.newCategoryText, details:[]})
		}
		this.newCategoryVisible = "hidden";
		this.newCategoryText = "";

		//this.filtersChange.emit(this.currentFilters);
		this.service.updateFilters(this.currentFilters);
		this.filtersChange.emit();
	}

	addDetail() {
		this.newDetailVisible = "visible";
	}

	onTabOpen(event) {
		this.categoryIndex = event.index;
	}

	saveDetail(event) {
		if(this.newDetailText != ""){
			console.log(this.categoryIndex);
			this.currentFilters[this.categoryIndex].details.push(this.newDetailText);
		}
		this.newDetailVisible = "hidden";
		this.newDetailText = "";

		this.service.updateFilters(this.currentFilters);
		//this.filtersChange.emit(this.currentFilters);
		this.filtersChange.emit();
	}

	modifyCategoryDetailText(category, detail) {

		if(this.currentCategory != "" && this.currentDetail != "")
		{	
			document.getElementById("replacementText_"+this.currentCategory+"_"+this.currentDetail).style.visibility = "hidden";
			document.getElementById("replacementTextSubmitBtn_"+this.currentCategory+"_"+this.currentDetail).style.visibility = "hidden";
		}

		document.getElementById("replacementText_"+category.name+"_"+detail).style.visibility = "visible";
		document.getElementById("replacementTextSubmitBtn_"+category.name+"_"+detail).style.visibility = "visible";

		this.currentCategory = category.name;
		this.currentDetail = detail;

		this.service.updateFilters(this.currentFilters);
		this.filtersChange.emit();
	}

	deleteDetail(category, detail) {
		var categoryIndex = this.currentFilters.indexOf(category);
		var detailIndex = this.currentFilters[categoryIndex].details.indexOf(detail);

		this.currentFilters[categoryIndex].details.splice(detailIndex,1);
		//this.filtersChange.emit(this.currentFilters);
		this.service.updateFilters(this.currentFilters);
		this.filtersChange.emit();
		this.deleteDetails.emit(category.name + " - " + detail);
	}

	saveReplacement(category, detail) {
		var categoryIndex = this.currentFilters.indexOf(category);
		var detailIndex = this.currentFilters[categoryIndex].details.indexOf(detail);

		console.log("saveReplacement: " + this.currentCategory+"_"+this.currentDetail);

		if(detailIndex && this.replacementText != "")
		{
			this.currentFilters[categoryIndex].details[detailIndex] = this.replacementText;
			document.getElementById("replacementText_" + category.name + "_"+detail).setAttribute("id","replacementText_" + category.name + "_"+this.replacementText);
			document.getElementById("replacementTextSubmitBtn_"+this.currentCategory+"_"+this.currentDetail).setAttribute("id","replacementTextSubmitBtn_" + category.name + "_"+this.replacementText);
			this.currentCategory = category.name;
			this.currentDetail = this.replacementText;
		}

		console.log("replacementText_"+this.currentCategory+"_"+this.currentDetail);
		console.log("replacementTextSubmitBtn_"+this.currentCategory+"_"+this.currentDetail);
		document.getElementById("replacementText_"+this.currentCategory+"_"+this.currentDetail).style.visibility = "hidden";
		document.getElementById("replacementTextSubmitBtn_"+this.currentCategory+"_"+this.currentDetail).style.visibility = "hidden";
		this.replacementText = "";

		this.service.updateFilters(this.currentFilters);
		this.filtersChange.emit();
	}

}
