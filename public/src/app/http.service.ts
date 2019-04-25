import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { 
  }

  getProjects(){
  return this._http.get('/projects');
 }


 getOneProject(id:string){
  return this._http.get('/projects/' + id);
  
 }

 createProject(banana){

  return this._http.post('/projects', banana);
  
 }

 editProject(project){
  // console.log(project, '------')
  console.log('Ghost')
  console.log(project._id);
  console.log('Serhiy');
  return this._http.put('/projects/'+project._id, project);
  
 }

 deleteProject(id:string){
  return this._http.delete('/projects/'+id);
  
 }

 getContact(){
  return this._http.get('/contact');
 }

 getHistory(){
  return this._http.get('/history');
 }

 getChat(){
  return this._http.get('/chat');
 }



}



