import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../mock-contacts';

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.scss'
})
export class ContactDetailComponent implements OnInit, OnChanges, OnDestroy {
  @Input() contact?: Contact;
  @Output() updateGroups = new EventEmitter<Contact>();

  groups = ['Favourites', 'Family', 'Friends', 'Classmates'];

  toggleGroup(group: string) {
    if (!this.contact) return;

    const inGroup = this.contact.groups.includes(group);
    const updated = {
      ...this.contact,
      groups: inGroup
        ? this.contact.groups.filter(g => g !== group)
        : [...this.contact.groups, group]
    };

    this.updateGroups.emit(updated);
  }

  // Lifecycle hooks for demonstration
  ngOnInit() {
    console.log("ContactDetailComponent Initialized");
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log("Input changed:", changes);
  }
  ngOnDestroy() {
    console.log("ContactDetailComponent Destroyed");
  }
}
