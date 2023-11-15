import { Component, OnInit,ViewChild, Output, EventEmitter} from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { ILogin } from 'src/app/model/user.model';

@Component({
  selector: 'app-inside-login',
  templateUrl: './inside-login.component.html',
  styleUrls: ['./inside-login.component.css']
})
export class InsideLoginComponent implements OnInit{
 
  @Output() updatedData = new EventEmitter <string>();
  
  constructor(){

  }
  ngOnInit(): void {
    
  }
  ButtonClick(){
    this.updatedData.emit('hello');
  }

}
