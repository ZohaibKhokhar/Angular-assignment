import { faker } from '@faker-js/faker';

export interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  gender: string;
  address: string;
  groups: string[];
}

const groups = ["Favourites", "Family", "Friends", "Classmates"];

export function generateContacts(): Contact[] {
  let contacts: Contact[] = [];
  for (let i = 1; i <= 50; i++) {
    const randomGroups = groups.filter(() => Math.random() > 0.5);
    contacts.push({
      id: i,
      name: faker.person.fullName(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      gender: faker.person.sex(),
      address: faker.location.streetAddress(),
      groups: randomGroups.length ? randomGroups : ["Friends"]
    });
  }
  return contacts;
}
