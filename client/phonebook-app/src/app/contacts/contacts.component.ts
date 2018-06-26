import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
//import { CONTACTS } from '../mock-contacts';
import { ContactService} from '../contact.service';
//import{headers} from '';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
// not sure 
/*
export interface Contact {
  allcontactsUrl: string;
  textfile: string;
}
*/


export class ContactsComponent implements OnInit {
  //allcontacts = CONTACTS;//Add a heroes property to the class that exposes these heroes for binding.
  allcontacts: Contact;

  
  //selectedContact: Contact;
  constructor(private contactService: ContactService) {
   }
  
   
  ngOnInit() {
    this. getContacts();
  }
 

 // onSelect(contact: Contact): void {
   // this.selectedContact = contact;
  //}
  /*
  contact: Contact;
  showContact() {
    this.contactService.getContacts()
      .subscribe((data: Contact) => this.contact = {...data},error => this.error = error // error path 
    );
    */
      
      /*
          allcontactsUrl: data['allcontactsUrl'],
          textfile:  data['textfile']
      });
      
  }
  */
  /*
  showContactResponse() {
    this.contactService.getContactResponse()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>`${key}: ${resp.headers.get(key)}`);
  
        // access the body directly, which is typed as `Config`.
        this.contact = { ... resp.body };
      });
  }
  */
  
  getContacts(): void {
    this.contactService.getContacts().subscribe(allcontacts => this.allcontacts = allcontacts);
    //this.contactService.getContacts().subscribe(allcontacts => this.allcontacts = allcontacts);

  }
  
/*
  add(contactfirstname: string,contactsecondname:string,contactphonenumber :string): void {
    contactfirstname = contactfirstname.trim();
    contactsecondname = contactsecondname.trim();
    contactphonenumber = contactphonenumber.trim();

    if (!contactfirstname) { return; }
    this.contactService.addContact({contactfirstname} as Contact)
      .subscribe(contact => {
        this.allcontacts.push(contact);
      });
  }
  */
 /*
 add(contactfirstname: string,id:number,newContact:Contact): void {
  contactfirstname = contactfirstname.trim();
  //contactsecondname = contactsecondname.trim();
  //contactphonenumber = contactphonenumber.trim();
  //this.contactService.addContact(newContact)
  //.subscribe(contact => this.allcontacts.push(contact));
  this.contactService.addContact(newContact)
  .subscribe(contact =>{
    this.allcontacts.push(contact);});

/*
  if (!contactfirstname) { return; }
 this.contactService.addContact({id}  as Contact)
    .subscribe(contact => {
      this.allcontacts.push(contact);
    });}
    */
  //}
  addContact(newContact:Contact) : void{
    this.contactService.addContact(newContact)
    .subscribe();  
    
  }
  
    delete(contact: Contact): void {
      //this.allcontacts= this.allcontacts.filter(h => h !== contact);
      //this.heroesService.deleteHero(hero.id).subscribe();
      this.contactService.deleteContact(contact.id).subscribe();
    }
    

}


