import { Component, Inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ICategory } from 'src/app/model/category.model';
import { CategoryService } from 'src/app/service/category.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { BookService } from 'src/app/service/book.service';
import { FormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class CategoryComponent implements OnInit {
  dataSource = new MatTableDataSource<ICategory>([]);
  categoryDatas: ICategory[] = [];
  category!: ICategory;
  categoryName: string ='';

  constructor(
    private categoryService: CategoryService,
    private bookService: BookService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.fetchCategoryList();
  }
  onDelete(id: string) {
    console.log('id', id);
    this.bookService.getBooksByCategoryId(id).subscribe((books) => {
      console.log(books.length);
      if (books.length === 0) {
        this.categoryService.deleteCategory(id).subscribe((res) => {
          alert('xóa thanh cong');
          this.fetchCategoryList();
        });
      } else {
        alert('Không thể xóa');
      }
    });
  }
  onCreate(): void {

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {categoryName: '', id: ''},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.category = {id: uuidv4(), categoryName:result}
      this.categoryService.createCategory(this.category)
      .subscribe(
        res => {
          console.log('them danh muc',this.category)
          this.fetchCategoryList();
        }
      )
      // console.log('The dialog was closed');
      // this.categoryName = result;
    });
  }
  onEditCategory(id: string) {
    console.log('id', id);
    this.categoryService.getCategoryById(id)
    .subscribe( res => {
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        data: {categoryName: res.categoryName, id: res.id},
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        this.category = {id: id, categoryName:result}
        this.categoryService.updateCategory(id, this.category)
        .subscribe(
          () => {
            console.log('cập nhật danh muc',this.category)
            this.fetchCategoryList();
          }
        )
        // console.log('The dialog was closed');
        // this.categoryName = result;
      });
    })
    
  }
  fetchCategoryList(): void {
    this.categoryService.getCategories().subscribe((response) => {
      console.log('response received');
      this.categoryDatas = response;
      this.dataSource.data = this.categoryDatas;
    });
  }
  
  displayedColumns: string[] = ['id', 'categoryName', 'action'];
}

@Component({
  selector: 'dialog-category',
  templateUrl: 'dialogCategory.component.html',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
  ],
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ICategory
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
