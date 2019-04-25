import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
   getProduct =[];
   projectToShow: any;

   project: any;
   projects = [];
   errors = [];
  constructor( 
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
    ) { }

  ngOnInit() {
    this.projectToShow = {
      name: "",
      quantity: "",
      gallery1: "",
      gallery2: "",
      gallery3: ""
     }
   
    this._route.params.subscribe((params: Params) => {
      this.getOneProject(params['id'])
    });
    
  }


    getOneProject(id){
      this._httpService.getOneProject(id).subscribe(data => {
          console.log("Got our project!", data)
          // this.productToShow = data["daddy"];
          // console.log(params["id"]);
          this.projectToShow = data["data"];
          console.log(this.projectToShow);
          console.log("RABBITSSSS!!!!!!!!!!!!!!!!")
          console.log(this.projectToShow.gallery);
        });
    }



    //here delete logic without conditions:
    deleteProject(id:string){
      this._httpService.deleteProject(id)
        .subscribe(projects => this.projects = projects['data'])
        this._router.navigate(['/home']);
    }



    //here delete logic with conditions:
    // deleteProject(id){
    //   //console.log('Quantity must be 0 to delete a project')
    //   if  (this.projectToShow.quantity===0){
    //       this._httpService.deleteProject(id).subscribe(data => {console.log("successful deletion", data)})
    //       this._router.navigate(['/home']);

    //   }
    //   else {

    //       this.errors.push('Quantity must be 0 to delete a project')
    //       console.log(this.errors);
    

    //   }
    // }




      
}
