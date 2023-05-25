import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent implements OnInit {
  registerAddress: FormGroup;

  obj = {
    name: 'sc',
    email: 'sc@123',
    addresses: [
      {
        id: 1,
        cityName: 'k',
        stateName: 'r',
        streetName: 's',
        landmark: 'c',
      },
      {
        id: 2,
        cityName: 'c',
        stateName: 's',
        streetName: 'c',
        landmark: 's',
      },
    ],
  };

  // Each formGroup creates object (service) -> (Dependency injection)
  constructor(private formBuilder: FormBuilder) {
    this.registerAddress = this.formBuilder.group({
      name: this.formBuilder.control(
        '',
        Validators.compose([Validators.required, Validators.minLength(5)])
      ),
      email: this.formBuilder.control(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-z0-9!@#$%^&]{5,10}/
          ),
        ])
      ),
      addresses: this.formBuilder.array([]),
    });

    // first no address, following code cretes an address before assigning
    this.obj.addresses.forEach(() => {
      this.addAddress();
    });

    this.registerAddress.patchValue(this.obj);
  }

  public get addressesAsFormArray(): FormArray {
    return this.registerAddress.get('addresses') as FormArray;
  }

  submit() {
    console.log(this.registerAddress.value);
  }

  addAddress() {
    this.addressesAsFormArray.push(this.getAddressFromGroup());
  }

  // Adding
  getAddressFromGroup(): FormGroup {
    return this.formBuilder.group({
      id: this.formBuilder.control(
        this.addressesAsFormArray.controls.length + 1
      ),
      cityName: this.formBuilder.control(
        '',
        Validators.compose([Validators.required])
      ),
      stateName: this.formBuilder.control(
        '',
        Validators.compose([Validators.required])
      ),
      streetName: this.formBuilder.control(
        '',
        Validators.compose([Validators.required])
      ),
      landMark: this.formBuilder.control(''),
    });
  }

  removeAddress(index: number): void {
    this.addressesAsFormArray.removeAt(index);
  }

  isFieldValid(formGroup: any, formConntrolName: string) {
    if (
      formGroup.get(formConntrolName)?.invalid &&
      (formGroup.get(formConntrolName)?.touched ||
        formGroup.get(formConntrolName)?.dirty)
    ) {
      return true;
    }
    return false;
  }

  getFieldErrorByType(formGroup: any, formConntrolName: string, type: string) {
    return formGroup.get(formConntrolName)?.errors?.[type];
  }

  ngOnInit(): void {}
}
