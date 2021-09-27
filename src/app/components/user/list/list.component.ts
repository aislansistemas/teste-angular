import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { User } from 'src/app/models/user';
import { PagedUtils } from 'src/app/utils/pagedUtils';
import { UserService } from '../../../services/user.service';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent extends BaseComponent implements OnInit {

  users: PagedUtils<User> = new PagedUtils<User>();
  currentPage: number = 1;
  itemsPerPage = 6;
  
  constructor(
    private userService: UserService
  ) { 
    super();
  }

  ngOnInit(): void {
    this.userService.get(this.currentPage, this.itemsPerPage)
      .subscribe(users => {
        this.users = users;
      });

  }

  getUsers():void {
    this.userService.get(this.currentPage, this.itemsPerPage)
      .subscribe(users => {
        this.currentPage = users.page;
        this.users = users;
      });
  }

}
