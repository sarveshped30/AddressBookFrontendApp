import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// service class for connecting with database and using http methods
export class AddressBookService {

  private baseUrl:string = "http://localhost:8080/addressBook"

  constructor(private http: HttpClient) { }

  addData(person:any): Observable<any> {
    return this.http.post(this.baseUrl + "/create", person);
  }

  getData(): Observable<any> {
    return this.http.get(this.baseUrl + "/fetchAll");
  }

  deleteData(personId: number): Observable<any> {
    return this.http.delete(this.baseUrl + "/delete/" + personId);
  }

  updateData(person : any, personId: number) : Observable<any> {
    return this.http.put(this.baseUrl + "/update/" + personId, person);
  }
  
}
