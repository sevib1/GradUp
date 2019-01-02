import { Validators, AbstractControl } from "@angular/forms";

export function validatePhoneIfNotEmpty(control: AbstractControl) {
  var result = null;
  if (control.value) {
    // https://regex101.com/r/BBMPv2/2
    result = Validators.pattern(/^(\+41|0)\s?(\d{2})\s?(\d{3})\s?(\d{2})\s?(\d{2})$/)(control);
  }
  console.debug('validatePhoneIfNotEmpty()', control.value, result);
  return result;
}

export function validateEmailIfNotEmpty(control: AbstractControl) {
  var result = null;
  if (control.value) {
    result = Validators.email(control);
  }
  console.debug('validateEmailIfNotEmpty()', control.value, result);
  return result;
}