import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { person } from 'src/app/model/person';
import { AddressBookService } from 'src/app/services/address-book.service';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // List of type person
  persons !: person[]

  constructor( private service: AddressBookService, private dialog: MatDialog) { }

  // Initializing data from database to dashboard
  ngOnInit(): void {
    this.service.getData().subscribe(response => {
      this.persons = response.data;
      console.log(this.persons);
    });
  }

  // delete person data
  deletePerson(personId: number) {
    this.service.deleteData(personId).subscribe(response => {
      console.log(response);
        this.ngOnInit();
    });
  }

  // sending existing data of person to dialog box and editing
  editPerson(person : any) {
    const dialogRef = this.dialog.open(FormComponent, {
    width: '60%',
    height: '70%',
    data:person,
  }).afterClosed().subscribe(val => {
    if(val == 'update') {
      this.ngOnInit();
    }
  })
}
}
