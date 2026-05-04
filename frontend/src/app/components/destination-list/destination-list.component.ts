import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DestinationService } from '../../services/destination.service';
import { Destination } from '../../models/destination.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-destination-list',
  standalone: true,
  imports:[CommonModule, RouterModule],
  templateUrl: './destination-list.component.html',
  styleUrl: './destination-list.component.css'
})
export class DestinationListComponent implements OnInit {
  destinations: Destination[] =[];

  constructor(private destinationService: DestinationService) {}

  ngOnInit(): void {
    this.loadDestinations();
  }

  loadDestinations(): void {
    this.destinationService.getDestinations().subscribe({
      next: (data) => this.destinations = data,
      error: (err) => console.error(err)
    });
  }

deleteDestination(id: string | undefined): void {
    if (id) {
      Swal.fire({
        title: 'Delete Destination?',
        text: "Warning: Any trips linked to this destination will lose their location data!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.destinationService.deleteDestination(id).subscribe(() => {
            Swal.fire('Deleted!', 'Destination deleted.', 'success');
            this.loadDestinations();
          });
        }
      });
    }
  }
}