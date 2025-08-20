import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../../mock-contacts';
import { HighlightPipe } from '../../pipes/highlight.pipe'; // <-- Add this import

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, HighlightPipe], // <-- Include the pipe here
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'] // <-- Fixed (plural)
})
export class ContactListComponent {
  @Input() contacts: Contact[] = [];
  @Input() currentFilter: string = 'All';
  @Output() filterChange = new EventEmitter<string>();
  @Output() selectContact = new EventEmitter<Contact>();

  filters = ['All', 'Favourites', 'Family', 'Friends', 'Classmates'];
}
