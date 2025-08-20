import { Component, OnInit } from '@angular/core';
import { Contact, generateContacts } from '../mock-contacts';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { CommonModule } from '@angular/common';
import { HighlightPipe } from '../pipes/highlight.pipe';
import { AlphaSpaceOnlyDirective } from '../directives/alpha-space-only.directive';
import { FormsModule } from '@angular/forms';

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

  ngOnInit() {
    const saved = localStorage.getItem('contacts');
    this.contacts = saved ? JSON.parse(saved) : generateContacts();
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
    this.contacts = this.contacts.map(c => c.id === updated.id ? updated : c);
    this.selectedContact = updated;
    this.persist();
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

  private persist() {
    localStorage.setItem('contacts', JSON.stringify(this.contacts));
  }
}
