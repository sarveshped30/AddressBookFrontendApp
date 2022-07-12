import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  addressBookForm !: FormGroup;

  constructor(
    private formBuilder : FormBuilder,
  ) { }

  ngOnInit(): void {
    this.addressBookForm = this.formBuilder.group({
      fullName : ['',Validators.required],
      phoneNumber : ['',Validators.required],
      address : ['',Validators.required],
      city : ['',Validators.required],
      state : ['',Validators.required],
      zipCode : ['',Validators.required],
    })
  }

  insert() {
    if(this.addressBookForm.valid) {
      console.log(this.addressBookForm.value);
      
    }
  }

}
