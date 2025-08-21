import { Component, OnInit } from '@angular/core';
import { Contact } from '../mock-contacts';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { CommonModule } from '@angular/common';
import { HighlightPipe } from '../pipes/highlight.pipe';
import { AlphaSpaceOnlyDirective } from '../directives/alpha-space-only.directive';
import { FormsModule } from '@angular/forms';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ContactListComponent,
    ContactDetailComponent,
    AlphaSpaceOnlyDirective,
    HighlightPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  currentFilter: string = 'All';
  selectedContact?: Contact;
  searchTerm: string = '';

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contacts = this.contactService.getAll();
    this.applyFilter();
  }

  setFilter(filter: string) {
    this.currentFilter = filter;
    this.applyFilter();
  }

  setSelected(contact: Contact) {
    this.selectedContact = contact;
  }

  updateGroups(updated: Contact) {
    this.contactService.updateContact(updated);
    this.contacts = this.contactService.getAll();
    this.selectedContact = updated;
    this.applyFilter();
  }

  addContact(newContact: Contact) {
    this.contactService.addContact(newContact);
    this.contacts = this.contactService.getAll();
    this.applyFilter();
  }

  applyFilter() {
    let result = this.currentFilter === 'All'
      ? this.contacts
      : this.contacts.filter(c => c.groups.includes(this.currentFilter));

    if (this.searchTerm.trim()) {
      result = result.filter(c =>
        c.name.toLowerCase() === this.searchTerm.toLowerCase()
      );
    }

    this.filteredContacts = result;
  }
}
