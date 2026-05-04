import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router'; 
import { DestinationService } from '../../services/destination.service';

@Component({
  selector: 'app-destination-form',
  standalone: true,
  imports:[CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './destination-form.component.html',
  styleUrl: './destination-form.component.css'
})
export class DestinationFormComponent implements OnInit {
  destinationForm: FormGroup;
  isEditMode = false;
  destinationId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private destinationService: DestinationService,
    private router: Router,
    private route: ActivatedRoute 
  ) {
    this.destinationForm = this.fb.group({
      name:['', Validators.required],
      country: ['', Validators.required],
      description:[''],
      imageUrl:['']
    });
  }

  ngOnInit(): void {
    this.destinationId = this.route.snapshot.paramMap.get('id');
    if (this.destinationId) {
      this.isEditMode = true;
      this.destinationService.getDestinationById(this.destinationId).subscribe((dest) => {
        this.destinationForm.patchValue(dest);
      });
    }
  }

  onSubmit(): void {
    if (this.destinationForm.invalid) return;

    if (this.isEditMode && this.destinationId) {
      this.destinationService.updateDestination(this.destinationId, this.destinationForm.value).subscribe(() => {
        this.router.navigate(['/destinations']);
      });
    } else {
      this.destinationService.createDestination(this.destinationForm.value).subscribe(() => {
        this.router.navigate(['/destinations']);
      });
    }
  }
}