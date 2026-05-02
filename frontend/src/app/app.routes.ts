import { Routes } from '@angular/router';
import { TripListComponent } from './components/trip-list/trip-list.component';

export const routes: Routes =[
  { path: '', redirectTo: '/trips', pathMatch: 'full' },
  { path: 'trips', component: TripListComponent }
];