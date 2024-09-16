import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-edit-element.modal',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './edit-element.modal.component.html',
})
export class EditElementModalComponent {
  private readonly _dialogRef = inject(MatDialogRef<EditElementModalComponent>);
  readonly data = inject<string>(MAT_DIALOG_DATA);

  closeDialog(value?: string) {
    this._dialogRef.close(value);
  }

  onPressEnter($event: KeyboardEvent) {
    const input = $event.target as HTMLInputElement;
    if ($event.key === 'Enter') {
      this.closeDialog(input.value);
    }
  }
}
