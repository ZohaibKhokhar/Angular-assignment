import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Contact } from '../mock-contacts';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent {
  form: FormGroup;
  groups = ['Favourites', 'Family', 'Friends', 'Classmates'];

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      id: [Date.now()],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      groups: [[]]
    });
  }

  toggleGroup(group: string) {
    const current = this.form.value.groups as string[];
    this.form.patchValue({
      groups: current.includes(group)
        ? current.filter(g => g !== group)
        : [...current, group]
    });
  }

  addContact() {
    const newContact: Contact = this.form.value;
    const stored = JSON.parse(localStorage.getItem('contacts') || '[]');
    stored.push(newContact);
    localStorage.setItem('contacts', JSON.stringify(stored));
    this.router.navigate(['/dashboard']);
  }
}
