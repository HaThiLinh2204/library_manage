import { Component, OnInit } from '@angular/core';
import { IBook } from 'src/app/model/book.model';
import { MatTableModule } from '@angular/material/table';
import { BookService } from 'src/app/service/book.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common'
import { CategoryComponent } from '../category/category.component';
import { ajax } from 'rxjs/ajax';
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
  ],
})
export class BookListComponent implements OnInit {
  // bookDatas: IBook[] = [
  //   {
  //     id: 1,
  //     name: 'Đắc nhân tâm',
  //     categoryId: 1,
  //     quantity: 10,
  //     remainingStock: 10,
  //   },
  //   {
  //     id: 2,
  //     name: 'Đắc nhân tâm 1',
  //     categoryId: 2,
  //     quantity: 10,
  //     remainingStock: 10,
  //   },
  //   {
  //     id: 3,
  //     name: 'Đắc nhân tâm 2',
  //     categoryId: 1,
  //     quantity: 12,
  //     remainingStock: 9,
  //   },
  //   {
  //     id: 4,
  //     name: 'Đắc nhân tâm 3',
  //     categoryId: 3,
  //     quantity: 10,
  //     remainingStock: 10,
  //   },
  //   {
  //     id: 5,
  //     name: 'Đắc nhân tâm 4',
  //     categoryId: 1,
  //     quantity: 10,
  //     remainingStock: 10,
  //   },
  //   {
  //     id: 6,
  //     name: 'Đắc nhân tâm 5',
  //     categoryId: 1,
  //     quantity: 10,
  //     remainingStock: 10,
  //   },
  // ];
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
  dataBookCategory: [IBook[], ICategory[]] = [[],[]];
  mergedObjects : any[] =[];


  constructor(private bookService: BookService, private categoryService: CategoryService) {
    
  }
  ngOnInit(): void {
    forkJoin(
      // as of RxJS 6.5+ we can use a dictionary of sources
      {
        bookDatas: this.bookService.getBooks(),
        categoryDatas: this.categoryService.getCategories(),
       
      }
    )
      // { google: object, microsoft: object, users: array }
      .subscribe( (response) => {
        console.log("response received");
        this.dataBookCategory = [response.bookDatas, response.categoryDatas];
       // this.dataSource.data = this.data;
       console.log(this.dataBookCategory)
       // console.log(this.dataSource.data);
        this.mergedObjects = this.mergeArraysByCategory(this.dataBookCategory[0], this.dataBookCategory[1], 'categoryId','id');
       // console.log(mergedObjects);
        this.dataSource.data = this.mergedObjects;
        console.log(this.dataSource.data);
        this.searchName(this.keyName,this.mergedObjects);
        console.log(this.newBookDatas);
        this.dataSource.data = this.newBookDatas;
      })
    // this.bookService.getBooks().subscribe(
    //   (response) => {
    //     console.log("response received");
    //     this.bookDatas = response;
    //     // console.log(this.bookDatas);
    //     this.dataSource.data = this.bookDatas;

    //     this.searchName(this.keyName, this.bookDatas);

    //     this.dataSource.data = this.newBookDatas;
    //   }
      // ,
      // (error) => {
      //   //error() callback
      //   console.error('Request failed with error');
      //   this.errorMessage = error;
      //   this.loading = false;
      // },
      // () => {
      //   //complete() callback
      //   console.error('Request completed'); //This is actually not needed
      //   this.loading = false;
      // }
    // );
    
    
    this.searchForm = new FormGroup({
      name: new FormControl(''),
    });
  }

  displayedColumns: string[] = [
    'id',
    'name',
    'quantity',
    'categoryName',
    'remainingStock',
    'action'
  ];
  onSubmit() {
    this.keyName = this.searchForm.get('name')?.value;

    console.log('Input value', this.keyName);
    this.newBookDatas = []; // Đặt lại mảng mới khi submit
    this.searchName(this.keyName, this.mergedObjects);
    this.dataSource.data = this.newBookDatas;
  }
  removeDiacritics(keyword: string) {
    return keyword.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  normalizeString(keyword: string) {
    return this.removeDiacritics((keyword||'').toLowerCase());
  }
  searchName(name: string, bookLists: any[]) {
    bookLists.forEach((book) => {
      if (
        this.normalizeString(book.name).includes(this.normalizeString(name))
      ) {
        this.newBookDatas.push(book);
      }
    });
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
  //dataSource = this.bookDatas;
}
