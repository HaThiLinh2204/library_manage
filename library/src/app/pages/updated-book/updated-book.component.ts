import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { IBook } from 'src/app/model/book.model';
import { ICategory } from 'src/app/model/category.model';

import { BookService } from 'src/app/service/book.service';
import { CategoryService } from 'src/app/service/category.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-updated-book',
  templateUrl: './updated-book.component.html',
  styleUrls: ['./updated-book.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
})
export class UpdatedBookComponent implements OnInit {
  bookId: string = '';
  newBook: IBook = {
    name: '',
    categoryId: '',
    quantity: 0,
    remainingStock: 0,
    id: '',
  };
  bookForm!: FormGroup;
  selectedValue: string = '';
  categoryDatas: ICategory[] = [];
  isUpdate: boolean = false;
  currentUrl: string = '';
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private categoryService: CategoryService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((res) => {
      this.categoryDatas = res;
      console.log(this.categoryDatas);
    });
    this.bookForm = this.formBuilder.group({
      name: ['', Validators.required],
      categoryId: ['', Validators.required],
      quantity: ['', Validators.required],
      remainingStock: [0, Validators.required],
    });
    this.currentUrl = this.router.url;
    console.log(typeof this.router.url);

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.bookId = idParam;
      this.bookService.getBookById(this.bookId).subscribe((book) => {
        this.bookForm.patchValue({
          name: book.name,
          categoryId: book.categoryId,
          quantity: book.quantity,
          remainingStock: book.remainingStock,
        });
      });
    } else {
      this.router.navigate(['/new-book']);
      console.log('Không có ID sách được cung cấp.');
    }
  }
  onUpdate() {
    console.log(this.bookForm.value);
    if (this.bookForm.valid) {
      console.log(typeof this.router.url);

      if (this.router.url === '/new-book') {
        this.bookForm.value.remainingStock = this.bookForm.value.quantity;

        this.newBook.id = uuidv4();
        this.newBook.categoryId = this.bookForm.value.categoryId;
        this.newBook.name = this.bookForm.value.name;
        this.newBook.quantity = this.bookForm.value.quantity;
        this.newBook.remainingStock = this.bookForm.value.remainingStock;

        this.bookService.createbook(this.newBook).subscribe((res) => {
          console.log(res);
          alert('thanh cong');
        });
        this.bookForm = this.formBuilder.group({
          name: ['', Validators.required],
          categoryId: ['', Validators.required],
          quantity: ['', Validators.required],
          remainingStock: [0, Validators.required],
        });
      } else {
        const updatedBook = this.bookForm.value;
        this.bookService.updateBook(this.bookId, updatedBook).subscribe(() => {
          console.log('Thông tin sách đã được cập nhật.');
          this.isUpdate = true;
        });
        this.currentUrl = this.router.url;
        console.log(this.currentUrl);
        alert('Cập nhật thành công');
        this.router.navigate(['/new-book']);
      }
    }
  }
  onCancel() {
    this.router.navigate(['/book-list']);
  }
}
