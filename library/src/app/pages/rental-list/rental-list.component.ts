import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { forkJoin } from 'rxjs';
import { IBook } from 'src/app/model/book.model';
import { ICategory } from 'src/app/model/category.model';
import { IRental, IRentalList } from 'src/app/model/rental.model';
import { BookService } from 'src/app/service/book.service';
import { CategoryService } from 'src/app/service/category.service';
import { RentalService } from 'src/app/service/rental.service';

@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.css'],
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
  ],
})
export class RentalListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  bookDatas: IBook[] = [];
  categoryDatas: ICategory[] = [];
  rentalDatas: IRental[] = [];
  bookList: any[] = [];
  rentalList: IRentalList[] = [];
  dataBookCategoryRental: [IBook[], ICategory[], IRental[]] = [[], [], []];
  searchForm!: FormGroup;
  dataSource = new MatTableDataSource<IRentalList>([]);
  selectedValue: string = '';
  newData: any[] = [];
  keyName: string = '';
  currentDate: Date = new Date();
  newRental!: IRental;
  newBook!: IBook;

  constructor(
    private rentalService: RentalService,
    private bookService: BookService,
    private categoryService: CategoryService
  ) {}
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.fetchRentalList();
    this.searchForm = new FormGroup({
      nameOrUserName: new FormControl(''),
    });
  }

  displayedColumns: string[] = [
    'id',
    'name',
    'categoryName',
    'userName',
    'dueDate',
    'returnDate',
    'status',
    'action',
  ];
  onSubmit() {
    this.keyName = this.searchForm.get('nameOrUserName')?.value;
    console.log('Input value', this.keyName);
    this.newData = [];
    this.searchNameOrUserName(
      this.keyName,
      this.selectedValue,
      this.rentalList
    );
    this.dataSource.data = this.newData;
  }
  onLend(id: string) {
    this.rentalService.getRentalById(id).subscribe((res) => {
      this.newRental = res;
      console.log(this.newRental);
      this.newRental.status = 'Đã trả';
      this.newRental.returnDate = this.currentDate;
      console.log(this.newRental.bookId);
      this.rentalService.updateRental(id, this.newRental).subscribe(() => {
        this.updateBookList(this.newRental.bookId);
        console.log('tra thanh cong');
        this.fetchRentalList();
      });
    });
  }
  updateBookList(id: string) {
    this.bookService.getBookById(id).subscribe((res) => {
      this.newBook = res;
      this.newBook.remainingStock = this.newBook.remainingStock + 1;
      this.bookService.updateBook(id, this.newBook).subscribe(() => {
        console.log('cap nhat so luong sach thanh cong');
        this.fetchRentalList();
      });
    });
  }
  fetchRentalList(): void {
    forkJoin({
      bookDatas: this.bookService.getBooks(),
      categoryDatas: this.categoryService.getCategories(),
      rentalDatas: this.rentalService.getRentalList(),
    }).subscribe((response) => {
      console.log('thanh cong');
      this.categoryDatas = response.categoryDatas;
      this.dataBookCategoryRental = [
        response.bookDatas,
        response.categoryDatas,
        response.rentalDatas,
      ];

      //console.log(this.dataBookCategoryRental)
      this.bookList = this.mergeArraysByCategory(
        this.dataBookCategoryRental[0],
        this.dataBookCategoryRental[1],
        'categoryId',
        'id'
      );

      console.log(this.bookList);
      this.rentalList = this.mergeArraysByCategory(
        this.dataBookCategoryRental[2],
        this.bookList,
        'bookId',
        'id',
        'name'
      );
      // this.dataSource.data = this.rentalList;
      this.searchNameOrUserName(
        this.keyName,
        this.selectedValue,
        this.rentalList
      );
      this.dataSource.data = this.newData;
      // console.log('rental', this.rentalList);
    });
  }
  searchNameOrUserName(name: string, select: string, list: any[]) {
    this.newData = list.filter((rental) => {
      if (
        (this.normalizeString(rental.name).includes(
          this.normalizeString(name)
        ) ||
          this.normalizeString(rental.userName).includes(
            this.normalizeString(name)
          )) &&
        rental.categoryName.includes(select)
      )
        return rental;
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
    field2: string,
    field3?: string
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
        // console.log('hello',mergedObject)
        if (field3 !== undefined && obj2[field3] !== undefined) {
          mergedObject[field3] = obj2[field3];
        }
        mergedArray.push(mergedObject);
      }
    });

    return mergedArray;
  }
}
