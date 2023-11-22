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
import { IRental } from 'src/app/model/rental.model';
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
    MatPaginatorModule
  ]
})
export class RentalListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  bookDatas: IBook[] = [];
  categoryDatas: ICategory[] = [];
  rentalDatas: IRental[] = [];

  //dataSource = new MatTableDataSource<IRental>([]);



  constructor(private rentalService: RentalService, private bookService: BookService, private categoryService : CategoryService) {

  }
  ngAfterViewInit(): void {

  }
  ngOnInit(): void {
    this.fetchRentalList();

  }

  displayedColumns: string[] = [
    'id',
    'name',
    'categoryName',
    'userName',
    'dueDate',
    'returnDate',
    'action'
  ];

  fetchRentalList(): void{
    forkJoin(
      {
        bookDatas: this.bookService.getBooks(),
        categoryDatas: this.categoryService.getCategories(),
        rentalDatas: this.rentalService.getRentalList()
      }
    ).subscribe(
      (response) => {
        console.log('thanh cong');
        console.log(response)

        

      }

    )
  }
}
