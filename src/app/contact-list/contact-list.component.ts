import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../mock-contacts';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent {
  @Input() contacts: Contact[] = [];
  @Input() currentFilter: string = 'All';
  @Output() filterChange = new EventEmitter<string>();
  @Output() selectContact = new EventEmitter<Contact>();

  filters = ['All', 'Favourites', 'Family', 'Friends', 'Classmates'];
}
