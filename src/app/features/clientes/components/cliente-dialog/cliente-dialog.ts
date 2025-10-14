import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

// Imports de Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ClientesService, Cliente } from '../../services/clientes';

@Component({
  selector: 'app-cliente-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './cliente-dialog.html',
  styleUrls: ['./cliente-dialog.scss'],
})
export class ClienteDialog {
  form: FormGroup;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ClienteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { cliente?: Cliente }
  ) {
    this.isEditMode = !!data.cliente;

    this.form = this.fb.group({
      nombre: [data.cliente?.nombre || '', Validators.required],
      nro_doc: [data.cliente?.nro_doc || '', Validators.required],
      email: [data.cliente?.email || '', Validators.email],
      telefono: [data.cliente?.telefono || ''],
      direccion: [data.cliente?.direccion || ''],
    });
  }

  onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
