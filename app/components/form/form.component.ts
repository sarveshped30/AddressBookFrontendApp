import { Component,Inject ,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressBookService } from 'src/app/services/address-book.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { person } from 'src/app/model/person';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  // Variable to store form data
  addressBookForm !: FormGroup;

  constructor(
    private formBuilder : FormBuilder,
    private service: AddressBookService,
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: person,
    private router: Router
  ) { }

  ngOnInit(): void {
    // validating form data
    this.addressBookForm = this.formBuilder.group({
      fullName : ['',Validators.required],
      phoneNumber : ['',Validators.required],
      address : ['',Validators.required],
      city : ['',Validators.required],
      state : ['',Validators.required],
      zipCode : ['',Validators.required],
    });

    // While editing, setting existing person data to dialog box 
    if(this.data != null) {
      this.addressBookForm.controls['fullName'].setValue(this.data.fullName);
      this.addressBookForm.controls['phoneNumber'].setValue(this.data.phoneNumber);
      this.addressBookForm.controls['address'].setValue(this.data.address);
      this.addressBookForm.controls['city'].setValue(this.data.city);
      this.addressBookForm.controls['state'].setValue(this.data.state);
      this.addressBookForm.controls['zipCode'].setValue(this.data.zipCode);
    }
  }

  // Adding person data to database
  insert() : void{
    if(this.data.personId == undefined) {
      if(this.addressBookForm.valid) {
        this.service.addData(this.addressBookForm.value).subscribe(response => {
          console.log(response);
          console.log(this.addressBookForm.value);
          alert(this.addressBookForm.value.fullName + " added successfully");
      });
      } else {
        alert("Invalid Credentails")
      }
    } else {
      this.updatePerson();
    } 
  }

  // updating person data
  updatePerson() {
    this.service.updateData(this.addressBookForm.value, this.data.personId).subscribe(response => {
      console.log(response);
      console.log(this.addressBookForm.value);
      this.dialogRef.close('update');
    })
  }
}