import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Contact } from '../mock-contacts';
import { ContactService } from '../services/contact.service';

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

  constructor(private fb: FormBuilder, private contactService: ContactService) {
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
  if (this.form.valid) {
    const newContact: Contact = {
      ...this.form.value,
      id: this.contactService.getNextId()
    };
    this.contactService.addContact(newContact);
    console.log(newContact);
    this.form.reset({ id: this.contactService.getNextId(), groups: [] });
  }
}
}
