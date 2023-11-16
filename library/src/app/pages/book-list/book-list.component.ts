import { Component, OnInit } from '@angular/core';
import { IBook } from 'src/app/model/book.model';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  standalone: true,
  imports: [MatTableModule],
})
export class BookListComponent implements OnInit {
  bookDatas: IBook[] = [
    {
      id: 1,
      name: 'Đắc nhân tâm',
      categoryId: 1,
      quantity: 10,
      remainingStock: 10,
    },
    {
      id: 2,
      name: 'Đắc nhân tâm 1',
      categoryId: 2,
      quantity: 10,
      remainingStock: 10,
    },
    {
      id: 3,
      name: 'Đắc nhân tâm 2',
      categoryId: 1,
      quantity: 12,
      remainingStock: 9,
    },
    {
      id: 4,
      name: 'Đắc nhân tâm 3',
      categoryId: 3,
      quantity: 10,
      remainingStock: 10,
    },
    {
      id: 5,
      name: 'Đắc nhân tâm 4',
      categoryId: 1,
      quantity: 10,
      remainingStock: 10,
    },
    {
      id: 6,
      name: 'Đắc nhân tâm 5',
      categoryId: 1,
      quantity: 10,
      remainingStock: 10,
    },
  ];
  
  constructor(){}
  ngOnInit(): void {
    
  }
  displayedColumns: string[] = ['id', 'name', 'quantity', 'remainingStock'];
  dataSource = this.bookDatas;
}
