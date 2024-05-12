import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { Subject } from 'rxjs'
import { ProductService } from '../../services/product.service'
import { environment } from '../../../environments/environment'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort, MatSortHeader } from '@angular/material/sort'
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatTableDataSource } from '@angular/material/table'
import { DecimalPipe } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { MatInput } from '@angular/material/input'
import { MatFormField, MatSuffix } from '@angular/material/form-field'
import { MatIcon } from '@angular/material/icon'
import { RouterLink } from '@angular/router'
import { MatFabButton, MatIconButton, MatButton } from '@angular/material/button'
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent } from '@angular/material/card'
import { MatDialog } from '@angular/material/dialog'
import { AlertDialogConfirmComponent } from '../alert-dialog-confirm/alert-dialog-confirm.component'
import { CreateProductDialogComponent } from '../create-product-dialog/create-product-dialog.component'

@Component({
    selector: 'app-stock',
    templateUrl: './stock.component.html',
    styleUrl: './stock.component.scss',
    standalone: true,
    imports: [MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatFabButton, RouterLink, MatIcon, MatCardContent, MatFormField, MatInput, FormsModule, MatIconButton, MatSuffix, MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatSortHeader, MatCellDef, MatCell, MatButton, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatPaginator, DecimalPipe]
})
export class StockComponent implements OnInit, AfterViewInit {

  displayedColumns = [
    'productID', 
    'productPicture', 
    'productName', 
    'unitPrice', 
    'unitInStock', 
    'action'
  ]

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator
  @ViewChild(MatSort, { static: false }) sort!: MatSort

  // Image URL
  imageUrl = environment.dotnet_api_url_image
  dataSource = new MatTableDataSource<any>()
  searchValue = ''
  searchTerm = new Subject<string>()

  page = 1
  limit = 100
  selectedCategory = ''
  searchQuery = ''

  constructor(
    private http: ProductService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.http.getAllProducts(this.page, this.limit, this.selectedCategory, this.searchQuery).subscribe({
      next: (result) => {
        // console.log(result)
        this.dataSource.data = result.products
      },
      error: (error) => {
        console.error(error)
      },
    })
    this.searchTerm.subscribe((value) => {
      // this.http.getProductByKeyword(value).subscribe({
      //   next: (result) => {
      //     this.dataSource.data = result.products
      //   },
      //   error: (error) => {
      //     console.error(error)
      //   }
      // })
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
  }

  async doFilter(event: any) {
    // do local
    this.dataSource.filter = event.target.value.trim()
    // do remote
    // this.dataSource.data = await lastValueFrom(
    //   this.rest.getProductByKeyword(event.target.value)
    // );
    this.searchTerm.next(event.target.value)
  }

  async onClickDelete(id: any) {

    const dialogConfirm = await this.dialog.open(AlertDialogConfirmComponent, {
      data: {
        title: 'ยืนยันการลบสินค้า',
        subtitle: 'คุณต้องการลบสินค้านี้ใช่หรือไม่?',
        confirmText: 'ยืนยันลบ',
        cancelText: 'ยกเลิก',
        confirmAction: () => {

          console.log('Product deleted! '+ id)

          // this.http.deleteProduct(id).subscribe({
          //   next: (result) => {
          //     console.log(result)
          //     this.dataSource.data = this.dataSource.data.filter((product: any) => product.productID !== id)
          //   },
          //   error: (error) => {
          //     console.error(error)
          //   }
          // })

          this.dataSource.data = this.dataSource.data.filter((product: any) => product.product_id !== id)
        }
      }
    }).afterClosed()
  }

  async onClickAddProduct() {
    const dialogRef = await this.dialog.open(CreateProductDialogComponent, {
      width: '600px',
      data: {
        title: 'เพิ่มสินค้าใหม่',
        product: {
          productName: '',
          unitPrice: 0,
          unitInStock: 0,
          productPicture: ''
        }
      }
    })
  }

  clearSearch() {
    this.searchValue = ''
    this.searchTerm.next('')
  }

}