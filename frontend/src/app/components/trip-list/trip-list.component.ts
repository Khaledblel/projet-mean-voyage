import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { Trip } from '../../models/trip.model';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './trip-list.component.html',
  styleUrl: './trip-list.component.css'
})
export class TripListComponent implements OnInit {
  trips: Trip[] =[];

  constructor(private tripService: TripService) {}

  ngOnInit(): void {
    this.loadTrips();
  }

  loadTrips(): void {
    this.tripService.getTrips().subscribe({
      next: (data) => this.trips = data,
      error: (err) => console.error('Error fetching trips', err)
    });
  }

  deleteTrip(id: string | undefined): void {
    if (id && confirm('Are you sure you want to delete this trip?')) {
      this.tripService.deleteTrip(id).subscribe(() => {
        this.loadTrips();
      });
    }
  }
}