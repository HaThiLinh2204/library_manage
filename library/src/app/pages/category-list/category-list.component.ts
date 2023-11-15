import { Component } from '@angular/core';
import { ICategory } from 'src/app/model/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent {
  categories: ICategory[] = [
    {
      id: 1,
      name: 'Trinh thám',
    },
    {
      id: 2,
      name: 'Truyện tranh',
    },
    {
      id: 3,
      name: 'Thiếu nhi'
    },
    {
      id: 4,
      name: "Kinh dị"
    }
  ];
}
