import { Component, OnInit } from '@angular/core';
import { Contact, generateContacts } from './mock-contacts';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContactListComponent, ContactDetailComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  currentFilter: string = 'All';
  selectedContact?: Contact;

  ngOnInit() {
    this.contacts = generateContacts();
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
    this.applyFilter();
  }

  private applyFilter() {
    if (this.currentFilter === 'All') {
      this.filteredContacts = this.contacts;
    } else {
      this.filteredContacts = this.contacts.filter(c => c.groups.includes(this.currentFilter));
    }
  }
}
