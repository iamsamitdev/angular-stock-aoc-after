import { Component, EventEmitter, Inject } from '@angular/core'
import { environment } from '../../../environments/environment'
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms'
import { MatButton } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'

import { MatInput } from '@angular/material/input'
import { MatFormField, MatLabel } from '@angular/material/form-field'
import {
  MatCard,
  MatCardHeader,
  MatCardTitle,
  MatCardContent,
} from '@angular/material/card'
import { MatSelectModule } from '@angular/material/select'
import { ProductService } from '../../services/product.service'
import { MatDialogContent, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog'
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component'

@Component({
  selector: 'app-edit-product-dialog',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    FormsModule,
    ReactiveFormsModule,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    MatIcon,
    MatSelectModule,
    MatDialogContent
  ],
  templateUrl: './edit-product-dialog.component.html',
  styleUrl: './edit-product-dialog.component.scss'
})
export class EditProductDialogComponent {

  formProduct!: FormGroup
  submitted: boolean = false
  imageURL = null
  imageFile = null

  // Image URL
  imageAPIURL = environment.dotnet_api_url_image
  productImage = this.editData.product_picture

  // Character count
  remainingCharacters = 50

  countCharacters() {
    this.remainingCharacters = 50 - this.formProduct.value.product_name.length
  }

  // Category
  categories = [
    { value: 1, viewValue: 'Mobile' },
    { value: 2, viewValue: 'Tablet' },
    { value: 3, viewValue: 'Smart Watch' },
    { value: 4, viewValue: 'Labtop' },
  ]

  // ฟังก์ชันสำหรับเลือกรูปภาพ
  onChangeImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (e: any) => {
        this.imageURL = e.target.result
      }
      reader.readAsDataURL(event.target.files[0])
      this.imageFile = event.target.files[0]
    }
  }

  // ฟังก์ชันสำหรับล้างรูปภาพ
  removeImage() {
    this.imageURL = null
    this.imageFile = null
    // ล้างค่าใน input file
    const input = document.getElementById('image') as HTMLInputElement
    input.value = ''
  }

  initForm() {
    // format date "2024-04-26T00:00:00"
    const date = new Date()
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')
    const dateNow = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`

    this.formProduct = this.formBuilder.group({
      product_name: ['', [Validators.required, Validators.minLength(3)]],
      unit_price: ['', [Validators.required]],
      unit_in_stock: ['', [Validators.required]],
      product_picture: [''],
      category_id: ['', [Validators.required]],
      created_date: [dateNow],
      modified_date: [dateNow],
    })

    if (this.editData) {
      this.formProduct.patchValue({
        product_name: this.editData.product_name,
        unit_price: this.editData.unit_price,
        unit_in_stock: this.editData.unit_in_stock,
        category_id: this.editData.category_id,
        created_date: this.editData.created_date,
        modified_date: this.editData.modified_date,
      })
    }

    console.log(this.editData)

  }

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditProductDialogComponent>,
    private http: ProductService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit() {
    this.initForm()
    this.remainingCharacters = 50
  }

  onSubmit() {
    console.log('Submit form')

    this.submitted = true
    if (this.formProduct.invalid) {
      return
    } else {
      // สร้าง object ชื่อ formData และกำหนดค่าเป็น new FormData()
      const formData: any = new FormData()

      // วนลูปดูค่าที่อยู่ใน formProduct
      for (let key in this.formProduct.value) {
        formData.append(key, this.formProduct.value[key])
      }

      // ถ้ามีการเลือกรูปภาพ
      if (this.imageFile) {
        formData.append('image', this.imageFile)
      }

      // วนลูปดูค่าที่อยู่ใน formData
      for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1])
      }

      this.http.updateProduct(this.editData.product_id, formData).subscribe({
        next: (data) => {
          console.log(data)
         
          this.dialog.open(AlertDialogComponent, {
            data: {
              title: 'Product Updated',
              icon: 'check_circle',
              iconColor: 'green',
              subtitle: 'Product updated successfully.',
            },
          })
          
          // Close the dialog
          this.dialogRef.close(true)
          // Emit event to parent component
          this.onUpdatedSuccess()
        },
        error: (error) => {
          console.error(error)
          alert('An error occurred while updating the product')
        }
      })
    }
    
  }

  closeDialog(): void {
    console.log('Close dialog')
    this.dialogRef.close(false)
  }

  // Emit event to parent component
  productUpdated = new EventEmitter<boolean>()

  onUpdatedSuccess() {
    this.productUpdated.emit(true)
  }

}
