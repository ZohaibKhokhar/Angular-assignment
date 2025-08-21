import { Injectable } from '@angular/core';
import { Contact, generateContacts } from '../mock-contacts';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts:Contact[]=generateContacts();

  
  getAll(){
    return this.contacts;
  }

  getNextId(): number {
    return this.contacts.length > 0
      ? Math.max(...this.contacts.map(c => c.id)) + 1
      : 1;
  }

  addContact(newContact: Contact): void {
    this.contacts.push(newContact);
  }

  updateContact(updated: Contact): void {
    this.contacts = this.contacts.map(c =>
      c.id === updated.id ? updated : c
    );
  }
}
