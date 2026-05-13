import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2'; 

import { TripService } from '../../services/trip.service';
import { DestinationService } from '../../services/destination.service';
import { Trip } from '../../models/trip.model';
import { Destination } from '../../models/destination.model';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './trip-list.component.html',
  styleUrl: './trip-list.component.css'
})
export class TripListComponent implements OnInit {
  trips: Trip[] = [];
  filteredTrips: Trip[] = [];
  paginatedTrips: Trip[] =[]; 
  destinations: Destination[] =[];

  
  searchTerm: string = '';
  selectedDestination: string = '';
  selectedDate: string = '';
  sortBy: string = '';

  
  currentPage: number = 1;
  itemsPerPage: number = 6; 

  constructor(
    private tripService: TripService,
    private destinationService: DestinationService
  ) {}

  ngOnInit(): void {
    this.loadDestinations();
    this.loadTrips();
  }

  loadDestinations(): void {
    this.destinationService.getDestinations().subscribe({
      next: (data) => this.destinations = data,
      error: (err) => console.error(err)
    });
  }

  loadTrips(): void {
    this.tripService.getTrips().subscribe({
      next: (data) => {
        this.trips = data;
        this.filterTrips();
      },
      error: (err) => console.error(err)
    });
  }

filterTrips(): void {
    let tempTrips = this.trips.filter(trip => {
      const matchesSearch = trip.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      const tripDestId = trip.destination ? (trip.destination as any)._id : null;
      const matchesDest = this.selectedDestination ? tripDestId === this.selectedDestination : true;
      let matchesDate = true;
      if (this.selectedDate) {
        const tripDate = new Date(trip.startDate).setHours(0,0,0,0);
        const filterDate = new Date(this.selectedDate).setHours(0,0,0,0);
        matchesDate = tripDate >= filterDate;
      }
      return matchesSearch && matchesDest && matchesDate;
    });

    if (this.sortBy === 'priceAsc') tempTrips.sort((a, b) => a.price - b.price);
    else if (this.sortBy === 'priceDesc') tempTrips.sort((a, b) => b.price - a.price);
    else if (this.sortBy === 'durationAsc') tempTrips.sort((a, b) => a.durationInDays - b.durationInDays);
    else if (this.sortBy === 'durationDesc') tempTrips.sort((a, b) => b.durationInDays - a.durationInDays);

    this.filteredTrips = tempTrips;
    this.currentPage = 1;
    this.updatePagination();
  }

  
  get totalPages(): number {
    return Math.ceil(this.filteredTrips.length / this.itemsPerPage);
  }

  getPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedTrips = this.filteredTrips.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  
  deleteTrip(id: string | undefined): void {
    if (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.tripService.deleteTrip(id).subscribe(() => {
            Swal.fire('Deleted!', 'The trip has been deleted.', 'success');
            this.loadTrips();
          });
        }
      });
    }
  }
}