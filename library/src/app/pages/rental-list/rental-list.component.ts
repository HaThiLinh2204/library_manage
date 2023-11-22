import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  rentalList:IRentalList[] = [];
  dataBookCategoryRental: [IBook[], ICategory[], IRental[]] = [[], [], []];

  dataSource = new MatTableDataSource<IRentalList>([]);

  constructor(
    private rentalService: RentalService,
    private bookService: BookService,
    private categoryService: CategoryService
  ) { }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
   }
  ngOnInit(): void {
    this.fetchRentalList();
  }

  displayedColumns: string[] = [
    'id',
    'nameBook',
    'categoryName',
    'userName',
    'dueDate',
    'returnDate',
    'status',
    'action',
  ];

  fetchRentalList(): void {
    forkJoin({
      bookDatas: this.bookService.getBooks(),
      categoryDatas: this.categoryService.getCategories(),
      rentalDatas: this.rentalService.getRentalList(),
    }).subscribe((response) => {
      console.log('thanh cong');
      this.dataBookCategoryRental = [
        response.bookDatas,
        response.categoryDatas,
        response.rentalDatas,
      ];
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
          'id'
        )
        this.dataSource.data = this.rentalList;
        console.log(this.rentalList)
    });
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
