import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AgmCoreModule } from '@agm/core';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
 
})
export class ContactComponent implements OnInit {

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    // this.address
  }

  






}
