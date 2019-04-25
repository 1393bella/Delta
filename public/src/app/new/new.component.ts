import { Component, OnInit } from '@angular/core';
import { HttpService , } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClientModule,HttpEventType} from '@angular/common/http';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  newProject: any;
  projects = [];
  selectedFile: File = null;
  //selectedFile = null;
  // assetsImages = [];
  //everything from form keys
  errors= []

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
    ) { }

  
    // onFileSelected(event){
    //   this.selectedFile = <File>event.target.files[0];
    //   console.log(event);
    // }

    // onUpload(){
    //   const fd = new FormData();
    //   fd.append("image", this.selectedFile, this.selectedFile.name);
    //   this._httpService.post("linkfromfirebase", fd {
    //     reportProgress: true,
    //     observe: "events"
    //   })
    //   .subscribe(event  =>{
    //     console.log(event);
    //   });

    // }


  ngOnInit() {
     this.newProject = {name: "",description: "",gallery1: "", gallery2: "", gallery3: ""}

  }



  // onFileSelected(event) {
  //   this.selectedFile = event.target.files[0]
  // }


  onCreateSubmit(){ 
    console.log(this.newProject);
    
    
    this._httpService.createProject(this.newProject).subscribe(data =>{
      console.log('data', data)
      
      if (data['message']==='Error'){
        // console.log(response)
        console.log('errors: ', data['error']['errors'])
        let banana = data['error']['errors']
        this.errors = []
        for(let errKey in banana){
          console.log('errKey: ', errKey)
          console.log('xxxx', banana[errKey]['message'])
          this.errors.push(banana[errKey]['message'])
        }
        //this.errors = data['error']['errors'];
        console.log("We got respond from database side aftre filling form", data)
        // this.newProject = { name: "" }
        // this._router.navigate(['new'])
      //this.getProjectsFromService()
    } else {
      this.goHome()
    }
     
  })
  }
  

  
  goHome() {
  this._router.navigate(['/home']);

  }




}
