import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ICategory } from 'src/app/model/category.model';
import { CategoryService } from 'src/app/service/category.service';

import { CommonModule } from '@angular/common';

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
  ]
})
export class CategoryComponent implements OnInit{
  dataSource = new MatTableDataSource<ICategory>([]);
  categoryDatas: ICategory[] = [];
  constructor( private categoryService: CategoryService){

  }
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (response) => {
        console.log("response received");
        this.categoryDatas = response;
        this.dataSource.data = this.categoryDatas;
      }
    )
  }

  displayedColumns: string[] = [
    'id',
    'categoryName'
  ];
}
