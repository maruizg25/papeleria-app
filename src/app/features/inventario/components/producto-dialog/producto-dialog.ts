import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

// Imports de Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Categoria, Producto, ProductosService, Unidad } from '../../services/productos.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-producto-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './producto-dialog.html',
  styleUrls: ['./producto-dialog.scss'],
})
export class ProductoDialog {
  private fb = inject(FormBuilder);
  private productosService = inject(ProductosService);
  form: FormGroup;
  isEditMode: boolean;

  // Observables para las listas desplegables
  categorias$!: Observable<Categoria[]>;
  unidades$!: Observable<Unidad[]>;

  constructor(
    public dialogRef: MatDialogRef<ProductoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { producto?: Producto }
  ) {
    this.isEditMode = !!data.producto;
    this.form = this.fb.group({
      nombre: [data.producto?.nombre || '', Validators.required],
      sku: [data.producto?.sku || ''],
      precio: [data.producto?.precio || 0, [Validators.required, Validators.min(0)]],
      costo: [data.producto?.costo || 0, Validators.min(0)],
      // --- AÑADE ESTOS DOS CONTROLES ---
      categoria_id: [data.producto?.categoria_id || null],
      unidad_id: [data.producto?.unidad_id || null, Validators.required], // <-- Es requerido
    });
  }

  ngOnInit(): void {
    // Cargamos los datos para los <select>
    this.categorias$ = this.productosService.getCategorias().pipe(map((res) => res.data || []));
    this.unidades$ = this.productosService.getUnidades().pipe(map((res) => res.data || []));
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
