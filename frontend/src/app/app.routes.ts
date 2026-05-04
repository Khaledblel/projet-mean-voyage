import { Routes } from '@angular/router';
import { TripListComponent } from './components/trip-list/trip-list.component';
import { TripFormComponent } from './components/trip-form/trip-form.component';
import { TripDetailComponent } from './components/trip-detail/trip-detail.component';
import { DestinationFormComponent } from './components/destination-form/destination-form.component';
import { DestinationListComponent } from './components/destination-list/destination-list.component';

export const routes: Routes =[
  { path: '', redirectTo: '/trips', pathMatch: 'full' },
  { path: 'trips', component: TripListComponent },
  { path: 'trips/new', component: TripFormComponent },
  { path: 'trips/edit/:id', component: TripFormComponent },
  { path: 'destinations', component: DestinationListComponent },
  { path: 'destinations/new', component: DestinationFormComponent },
  { path: 'destinations/edit/:id', component: DestinationFormComponent },
  { path: 'trips/:id', component: TripDetailComponent } 
];