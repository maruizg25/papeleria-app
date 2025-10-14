import { Component, Inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pago-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './pago-dialog.html',
  styleUrls: ['./pago-dialog.scss'],
})
export class PagoDialog {
  form: FormGroup;
  montoRecibido = signal(0);

  cambio = computed(() => {
    const recibido = this.montoRecibido();
    const total = this.data.total;
    return this.form.value.metodo === 'EFECTIVO' && recibido > total ? recibido - total : 0;
  });

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<PagoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { total: number }
  ) {
    this.form = this.fb.group({
      metodo: ['EFECTIVO', Validators.required],
      monto: [this.data.total, [Validators.required, Validators.min(this.data.total)]],
      referencia: [''],
    });

    this.montoRecibido.set(this.data.total); // <-- Inicializa el signal aquí

    // Cuando el monto del formulario cambie, actualizamos el signal
    this.form.get('monto')?.valueChanges.subscribe((value) => {
      this.montoRecibido.set(value || 0);
    });
  }

  onConfirm(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
