import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudServiceService {

  url='http://localhost:8080/'

  constructor(private http: HttpClient) {}

  getAll(endPoint:String): Observable<any>{
    return this.http.get("http://localhost:8080/user");
  }
  get(endPoint:String,id:string): Observable<any>{
    return this.http.get(this.url+endPoint+'/'+id);
  }
  save(model:any,endPoint:string):Observable<any>{
    return this.http.post("http://localhost:8080/user",model);
  }
  update(model:any,endPoint:string,id:string):Observable<any>{
    return this.http.put(this.url+endPoint+'/'+id,model)
  }
  updateWithoutId(model:any,endPoint:string):Observable<any>{
    return this.http.put(this.url+endPoint+'/',model)
  }
  delete(id:string,endPoint:string):Observable<any>{
    return this.http.delete(this.url+endPoint+'/'+id)
  }
}
