import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BackendCommService } from './backend-comm.service';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TableModule } from 'primeng/table';
import { RouterModule, Routes } from '@angular/router';
import { PositionsPageComponentComponent } from './positions-page-component/positions-page-component.component';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ToolbarModule } from 'primeng/toolbar';
import { AccordionModule } from 'primeng/accordion';
import { FiltersComponent } from './filters/filters.component';
import { PickListModule } from 'primeng/picklist';

const appRoutes: Routes = [
  {path: '**', component: PositionsPageComponentComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    PositionsPageComponentComponent,
    FiltersComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes)
    ,
    BrowserModule,
    HttpClientModule,
    TableModule,
    BrowserAnimationsModule,
    FormsModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    ToolbarModule,
    AccordionModule,
    PickListModule
  ],
  providers: [BackendCommService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
