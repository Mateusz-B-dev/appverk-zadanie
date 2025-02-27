import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslatePipe]
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  
  private _value: any = '';

  onChange: any = () => {};
  onTouched: any = () => {};
  
  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }
  
  get control(): FormControl {
    return this.controlDir.control as FormControl;
  }

  hasError(errorName: string): boolean {
    return this.control?.errors ? !!this.control.errors[errorName] : false;
  }

  writeValue(obj: any): void {
    this._value = obj !== null ? obj : '';
    
    if (this.control) {
      this.control.setValue(this._value, { emitEvent: false });
    }
  }
  
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  
  setDisabledState?(isDisabled: boolean): void {
    if (this.control) {
      if (isDisabled) {
        this.control.disable();
      } else {
        this.control.enable();
      }
    }
  }
}