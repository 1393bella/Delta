import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  projects = [];
  projectRange = [];
  // assetsImages = [];

  newProject: any;
  projectToEdit = null;
  projectToShow = null;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router

    ) { }

  ngOnInit() {
    this.getProjectsFromService()
    // this.assetsImages = []

  }


    onAddClick() { 
      this.goNew();
      console.log(`Click add is working`);
    }

    goNew() {
      this._router.navigate(['/new']);
    }


  
    onViewClick(){ 
      this.goView();
      console.log(`Click view is working`);
    }

    goView() {
      this._router.navigate(['/view']);
    }
  
  
  
    getProjectsFromService(){
      let observable = this._httpService.getProjects();
      observable.subscribe(data => {
        console.log("Got our all projects!", data)
        // In this example, the array of projects is assigned to the key 'projects' in the data object. 
        // This may be different for you, depending on how you set up your Project API.
        
        for( var i =0; i<data["data"].length; i++) {
          if (data["data"][i + 1]){
            var newArr = [data["data"][i], data["data"][i+1]]
            this.projects.push(newArr)
          } else {
            var newArr = [data["data"][i], {name: undefined, gallery1: undefined}]
            this.projects.push(newArr)
          }
          
          i+=1
        }
        console.log('bella', this.projects)
        this.projectRange = Array.from({length: this.projects.length}, (x,i) => i)
        console.log(this.projectRange)
      });
    }
  
    // here delete logic without conditions:
    deleteProject(id:string){
      this._httpService.deleteProject(id)
        .subscribe(projects => this.projects = projects['data'])
    }
  



  

  
}
      //// it will just display form within a value
      // onEditClick(task){
      //   this.projectToEdit = project;
      // }


      // showProject(project: any){
      //   this.projectToShow = project;
      // }
