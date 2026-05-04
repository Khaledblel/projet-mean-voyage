import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { DestinationService } from '../../services/destination.service';
import { Destination } from '../../models/destination.model';

@Component({
  selector: 'app-trip-form',
  standalone: true,
  imports:[CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './trip-form.component.html',
  styleUrl: './trip-form.component.css'
})
export class TripFormComponent implements OnInit {
  tripForm: FormGroup;
  destinations: Destination[] =[];
  isEditMode = false;
  tripId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private tripService: TripService,
    private destinationService: DestinationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    
    this.tripForm = this.fb.group({
      title: ['', Validators.required],
      destination: ['', Validators.required],
      price: [0,[Validators.required, Validators.min(0)]],
      durationInDays: [1,[Validators.required, Validators.min(1)]],
      startDate: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadDestinations();
    
    
    this.tripId = this.route.snapshot.paramMap.get('id');
    if (this.tripId) {
      this.isEditMode = true;
      this.tripService.getTripById(this.tripId).subscribe((trip: any) => {
        
        const formattedDate = new Date(trip.startDate).toISOString().split('T')[0];
        
        this.tripForm.patchValue({
          ...trip,
          destination: trip.destination._id || trip.destination,
          startDate: formattedDate
        });
      });
    }
  }

  loadDestinations(): void {
    this.destinationService.getDestinations().subscribe({
      next: (data) => this.destinations = data,
      error: (err) => console.error(err)
    });
  }

  onSubmit(): void {
    if (this.tripForm.invalid) return;

    const tripData = this.tripForm.value;

    if (this.isEditMode && this.tripId) {
      this.tripService.updateTrip(this.tripId, tripData).subscribe(() => {
        this.router.navigate(['/trips']);
      });
    } else {
      this.tripService.createTrip(tripData).subscribe(() => {
        this.router.navigate(['/trips']);
      });
    }
  }
}