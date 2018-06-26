import { Injectable } from '@angular/core';
import {  Contact } from './contact';
import { CONTACTS } from './mock-contacts';
import { catchError, map, tap } from 'rxjs/operators';

import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { HttpErrorResponse} from '@angular/common/http';
import {  throwError } from 'rxjs';
import { retry } from 'rxjs/operators';

const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': 'my-auth-token'
})
};


//@Injectable({providedIn: 'root'}) // remove as in angular httpclient ex 
@Injectable()

export class ContactService {
   //private allcontactsUrl = 'api/allcontacts';  // URL to web api
   private allcontactsUrl ='http://localhost:3000/api/people';
  

  constructor( private http: HttpClient,private messageService: MessageService) { }

  //getContacts(): Observable<Contact[]> {
     // TODO: send the message _after_ fetching the heroes
     //this.messageService.add('ContactService: fetched allcontacts');
     //return of(CONTACTS);}
     // angular http ex  
     contactUrl = 'assets/contact.json';
      getContacts() {
        return this.http.get<Contact>(this.contactUrl);
      //return this.http.get(this.contactUrl);
    }

     /*
     getContacts (): Observable<Contact[]> {
      return this.http.get<Contact[]>(this.allcontactsUrl)
      /*
      .pipe(
        tap(allcontacts => this.log(`fetched allcontacts`)),
        catchError(this.handleError('getContacts',[]))
      );
    } 
      */
     //not sure
     getContactResponse(): Observable<HttpResponse<Contact>> {
      return this.http.get<Contact>(
        this.contactUrl, { observe: 'response' });
    }
        
      /** GET hero by id. Return `undefined` when id not found */
    getContactNo404<Data>(id: number): Observable<Contact> {
    const url = `${this.allcontactsUrl}/?id=${id}`;
    return this.http.get<Contact[]>(url)
      
      .pipe(
        map(allcontacts => allcontacts[0]), // returns a {0|1} element array
        /*
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} contact id=${id}`);
        }),
        */
        catchError(this.handleError<Contact>(`getContact id=${id}`))
      );
  }
  /** GET hero by id. Will 404 if id not found */
  getContact(id: number): Observable<Contact> {
    const url = `${this.allcontactsUrl}/${id}`;
    return this.http.get<Contact>(url).pipe(
      //tap(_ => this.log(`fetched contact id=${id}`)),
      catchError(this.handleError<Contact>(`getContact id=${id}`))
    );
  }

    //getContact(id: number): Observable<Contact> {
      // TODO: send the message _after_ fetching the hero
      //this.messageService.add(`ContactService: fetched contact id=${id}`);
      //return of(CONTACTS.find(contact => contact.id === id));
    //}
    /** PUT: update the hero on the server */
    /*
updateContact (contact: Contact): Observable<Contact> {
  return this.http.put(this.allcontactsUrl, contact, httpOptions).pipe(
   // tap(_ => this.log(`updated contact id=${contact.id}`)),
    catchError(this.handleError<any>('updateContact'))
  );
}
*/
updateContact (contact: Contact): Observable<Contact> {
  return this.http.put<Contact>(this.allcontactsUrl, contact, httpOptions)
    .pipe(
      catchError(this.handleError('updateContact', contact))
    );
}
/** POST: add a new hero to the server */
addContact (contact: Contact): Observable<Contact> {
  return this.http.post<Contact>(this.allcontactsUrl, contact, httpOptions).pipe(
    //tap((contact: Contact) => this.log(`added contact w/ id=${contact.id}`)),
    catchError(this.handleError('addContact', contact))
  );
}
/** DELETE: delete the hero from the server */
/*
deleteContact (contact: Contact | number): Observable<Contact> {
  const id = typeof contact === 'number' ? contact : contact.id;
  const url = `${this.allcontactsUrl}/${id}`;

  return this.http.delete<Contact>(url, httpOptions).pipe(
   // tap(_ => this.log(`deleted contact id=${id}`)),
    catchError(this.handleError<Contact>('deleteContact'))
  );
}
*/
deleteContact (id: number): Observable<{}> {
  const url = `${this.allcontactsUrl}/${id}`; // DELETE api/heroes/42
  return this.http.delete(url, httpOptions)
    .pipe(
      catchError(this.handleError('deleteContact'))
    );
}
/* GET heroes whose name contains search term */
searchContacts(term: string): Observable<Contact[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Contact[]>(`${this.allcontactsUrl}/?firstname=${term}`).pipe(
    tap(_ => this.log(`found allcontacts matching "${term}"`)),
    catchError(this.handleError<Contact[]>('searchContacts', []))
  );
}

     /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
 /*
 private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError(
    'Something bad happened; please try again later.');
};
    /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('ContactService: ' + message);
  }
}

