import { Component, OnInit } from '@angular/core';
import { IBook } from 'src/app/model/book.model';
import { MatTableModule } from '@angular/material/table';
import { BookService } from 'src/app/service/book.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { forkJoin } from 'rxjs';
import { CategoryService } from 'src/app/service/category.service';
import { ICategory } from 'src/app/model/category.model';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatPaginatorModule

  ],
  providers: [{ provide: MatPaginatorIntl }]
})
export class BookListComponent implements OnInit, MatPaginatorIntl {
  dataSource = new MatTableDataSource<IBook>([]);
  bookDatas: IBook[] = [];
  categoryDatas: ICategory[] = [];
  newBookDatas: IBook[] = [];
  loading: boolean = false;
  errorMessage: string = '';
  searchForm!: FormGroup;
  submitted: boolean = false;
  keyName: string = '';
  selectedValue: string = '';
  dataBookCategory: [IBook[], ICategory[]] = [[], []];
  mergedObjects: any[] = [];
  changes = new Subject<void>();

  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.
  firstPageLabel = $localize`First page`;
  itemsPerPageLabel = $localize`Items per page:`;
  lastPageLabel = $localize`Last page`;

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  nextPageLabel = 'Next page';
  previousPageLabel = 'Previous page';


  constructor(private bookService: BookService, private categoryService: CategoryService) {

  }
  ngOnInit(): void {
    forkJoin(
      {
        bookDatas: this.bookService.getBooks(),
        categoryDatas: this.categoryService.getCategories(),

      }
    )
      .subscribe((response) => {
        console.log("response received");
        this.categoryDatas = response.categoryDatas;
        this.dataBookCategory = [response.bookDatas, response.categoryDatas];
        this.mergedObjects = this.mergeArraysByCategory(this.dataBookCategory[0], this.dataBookCategory[1], 'categoryId', 'idCategory');
        this.searchName(this.keyName, this.selectedValue, this.mergedObjects);
        this.dataSource.data = this.newBookDatas;
      })
    this.searchForm = new FormGroup({
      name: new FormControl(''),
    });
  }

  displayedColumns: string[] = [
    'id',
    'name',
    'categoryName',
    'quantity',

    'remainingStock',
    'action'
  ];
  onSubmit() {
    this.keyName = this.searchForm.get('name')?.value;

    console.log('Input value', this.keyName);
    this.newBookDatas = []; // Đặt lại mảng mới khi submit
    this.searchName(this.keyName, this.selectedValue, this.mergedObjects);
    this.dataSource.data = this.newBookDatas;
    console.log('newBookDatas', this.newBookDatas)
    console.log('dataSource', this.dataSource.data)
    console.log('selectedValue', this.selectedValue)
  }
  removeDiacritics(keyword: string) {
    return keyword.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  normalizeString(keyword: string) {
    return this.removeDiacritics((keyword || '').toLowerCase());
  }

  searchName(name: string, select: string, bookLists: any[]) {
    this.newBookDatas = bookLists.filter((book) => {
      // console.log(book.name)
      if (this.normalizeString(book.name).includes(this.normalizeString(name)) && book.categoryName.includes(select))
        return book;
    })

  }
  mergeArraysByCategory(array1: any[], array2: any[], field1: string, field2: string) {
    const mapObj2: { [key: string]: any } = {};

    array2.forEach((obj) => {
      mapObj2[obj[field2]] = obj;
    });

    const mergedArray: any[] = [];

    array1.forEach((obj1) => {
      const obj2 = mapObj2[obj1[field1]];
      if (obj2) {
        const mergedObject = { ...obj1, ...obj2 };
        mergedArray.push(mergedObject);
      }
    });

    return mergedArray;
  }
  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return $localize`Page 1 of 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return $localize`Page ${page + 1} of ${amountPages}`;
  }
}
