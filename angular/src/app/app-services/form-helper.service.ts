import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class FormHelperService {

  constructor(
    private translateService: TranslateService,
    private matSnackBar: MatSnackBar) {}

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  controlIsValid(control: FormControl) {
    return control.invalid && control.dirty && control.touched;
  }

  controlHasError(control: FormControl, validatorName: string) {
    return control.dirty && control.touched && control.errors && control.errors[validatorName];
  }

  showError(messageKey: string, messageVariables: any) {
    this.translateService.get(messageKey, messageVariables).subscribe((translation: string) => {
      this.matSnackBar.open(translation, '', { duration: 3000, panelClass: ['uk-text-center', 'uk-text-danger'] });
    });
  }

  showMessage(messageKey: string, messageVariables: any) {
    this.translateService.get(messageKey, messageVariables).subscribe((translation: string) => {
      this.matSnackBar.open(translation, '', { duration: 3000, panelClass: ['uk-text-center'] });
    });
  }
}
