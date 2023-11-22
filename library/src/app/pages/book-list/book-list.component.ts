import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IBook } from 'src/app/model/book.model';
import { MatTableModule } from '@angular/material/table';
import { BookService } from 'src/app/service/book.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
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
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { forkJoin } from 'rxjs';
import { CategoryService } from 'src/app/service/category.service';
import { ICategory } from 'src/app/model/category.model';
import { Router } from '@angular/router';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { IRental, IRentalList } from 'src/app/model/rental.model';
import { MatNativeDateModule } from '@angular/material/core';
import { v4 as uuidv4 } from 'uuid';
import { RentalService } from 'src/app/service/rental.service';


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
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [MatDatepickerModule, MatNativeDateModule],
})
export class BookListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dataSource = new MatTableDataSource<IBook>([]);
  bookDatas: IBook[] = [];
  categoryDatas: ICategory[] = [];
  newBookDatas: IBook[] = [];
  searchForm!: FormGroup;
  keyName: string = '';
  selectedValue: string = '';
  dataBookCategory: [IBook[], ICategory[]] = [[], []];
  mergedObjects: any[] = [];

  constructor(
    private bookService: BookService,
    private categoryService: CategoryService,
    private rentalService: RentalService,
    private router: Router,
    public dialog: MatDialog
  ) {}
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.fetchBookList();
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
    'action',
  ];

  onSubmit() {
    this.keyName = this.searchForm.get('name')?.value;

    console.log('Input value', this.keyName);
    this.newBookDatas = []; // Đặt lại mảng mới khi submit
    this.searchName(this.keyName, this.selectedValue, this.mergedObjects);
    this.dataSource.data = this.newBookDatas;
  }
  onDelete(id: string) {
    console.log('id', id);
    this.bookService.deleteBook(id).subscribe((res) => {
      console.log('done');
      this.fetchBookList();
    });
  }
  onEditBook(id: string) {
    this.router.navigate([`updated-book/${id}`]);
  }
  onBorrow(id: string) {
    const mapObj2: { [key: string]: any } = {};
    this.newBookDatas.forEach((obj) => {
      mapObj2[obj['id']] = obj;
    });
    console.log(mapObj2[id]);
    const { categoryName, ...bookBorrow } = mapObj2[id];
    console.log(bookBorrow);
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {
        id: uuidv4(),
        bookId: id,
        userName: '',
        nameBook: mapObj2[id].name,
        categoryName: mapObj2[id].categoryName,
        dueDate: '',
        status: 'Đang mượn',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      const { nameBook, categoryName, ...result1 } = result;
      this.rentalService.createRental(result1).subscribe((res) => {
        alert('Mượn thành công');
        bookBorrow.remainingStock = bookBorrow.remainingStock - 1;
        this.bookService.updateBook(id, bookBorrow).subscribe(() => {
          this.fetchBookList();
        });
      });
      console.log(result1);
    });
  }
  fetchBookList(): void {
    forkJoin({
      bookDatas: this.bookService.getBooks(),
      categoryDatas: this.categoryService.getCategories(),
    }).subscribe((response) => {
      console.log('response received');
      this.categoryDatas = response.categoryDatas;
      this.dataBookCategory = [response.bookDatas, response.categoryDatas];
      this.mergedObjects = this.mergeArraysByCategory(
        this.dataBookCategory[0],
        this.dataBookCategory[1],
        'categoryId',
        'id'
      );
      this.searchName(this.keyName, this.selectedValue, this.mergedObjects);
      this.dataSource.data = this.newBookDatas;
    });
  }

  searchName(name: string, select: string, bookLists: any[]) {
    this.newBookDatas = bookLists.filter((book) => {
      if (
        this.normalizeString(book.name).includes(this.normalizeString(name)) &&
        book.categoryName.includes(select)
      )
        return book;
    });
  }
  removeDiacritics(keyword: string) {
    return keyword.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  normalizeString(keyword: string) {
    return this.removeDiacritics((keyword || '').toLowerCase());
  }
  mergeArraysByCategory(
    array1: any[],
    array2: any[],
    field1: string,
    field2: string
  ) {
    const mapObj2: { [key: string]: any } = {};

    array2.forEach((obj) => {
      mapObj2[obj[field2]] = obj;
    });

    const mergedArray: any[] = [];

    array1.forEach((obj1) => {
      const obj2 = mapObj2[obj1[field1]];

      if (obj2) {
        const mergedObject = {
          id: obj1.id,
          ...obj1,
          categoryName: obj2.categoryName,
        };

        mergedArray.push(mergedObject);
      }
    });

    return mergedArray;
  }
}
@Component({
  selector: 'dialog-book',
  templateUrl: 'dialogBook.component.html',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [MatDatepickerModule, MatNativeDateModule],
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: IRentalList
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
