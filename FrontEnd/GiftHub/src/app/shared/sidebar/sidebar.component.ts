import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isAdmin:Boolean = localStorage.getItem('username') === 'admin' ? true : false;

  constructor() { }

  ngOnInit(): void {
  }

}
