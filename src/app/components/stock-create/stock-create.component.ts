import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ProductService } from '../../services/product.service'
import { MatButton } from '@angular/material/button';

import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

@Component({
    selector: 'app-stock-create',
    templateUrl: './stock-create.component.html',
    styleUrl: './stock-create.component.scss',
    standalone: true,
    imports: [MatCard, MatCardHeader, MatCardTitle, FormsModule, ReactiveFormsModule, MatCardContent, MatFormField, MatLabel, MatInput, MatButton]
})
export class StockCreateComponent implements OnInit{
  
  formProduct!: FormGroup;
  imageURL = null
  imageFile = null

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

    this.formProduct = new FormGroup({
      productName: new FormControl('', Validators.required),
      unitPrice: new FormControl('', Validators.required),
      unitInStock: new FormControl('', Validators.required),
      image: new FormControl(''),
      categoryID: new FormControl('', Validators.required),
      createdDate: new FormControl(dateNow, Validators.required),
      modifiedDate: new FormControl(dateNow, Validators.required),
    });
  }
  
  constructor(
    private http: ProductService
  ) {}

  ngOnInit() {
    this.initForm()
  }

  onSubmit() {
    if (this.formProduct.invalid) {
      return;
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

      this.http.createProduct(formData).subscribe({
        next: (data) => {
          console.log(data);
          alert('Product created successfully');
          this.formProduct.reset();
        },
        error: (error) => {
          console.error(error);
          alert('An error occurred while creating the product');
        }
      })

    }
  }

}
