import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { CrudServiceService } from 'src/app/services/crud/crud-service.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  loginVisible:boolean=true;
  userIsInMobile:boolean=false;
  userIsEdit:boolean=false;
  registerForm:FormGroup;
  listUsers:User[] =[]
  actualIndex:number=0;
  formName:string="Crear Usuario"
  buttonName:string="Crear"

  constructor(private fb:FormBuilder,private crudService:CrudServiceService) {  
    this.registerForm=this.fb.group({
      username:['',[Validators.required,]],
      email:['',[Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]],
      password:['',[Validators.required, Validators.pattern("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$")]],
    })

  }

  ngOnInit(): void {
    this.readUsers()
  }

  createUser(){
    const USER:User={
      username:this.registerForm.get("username")?.value,
      email:this.registerForm.get("email")?.value,
      password:this.registerForm.get("password")?.value,
    }

    if (this.userIsEdit){
      this.crudService.update(USER,"user",this.actualIndex.toString()).subscribe(
        {
          complete:()=>{
            this.cancelEdit()
            this.readUsers()
  
          },
          error:(error)=>{
            console.log(error)
          }
  
        }
      )
      
    }else{
      this.crudService.save(USER,"user").subscribe(
        {
          complete:()=>{
            console.log("ok")
            this.readUsers()
            this.registerForm.reset();
  
          },
          error:(error)=>{
            console.log(error)
          }
  
        }
      )
    }
  }

  editUser(index:number){
    this.formName="Editar Usuario"
    this.buttonName="Editar"
    this.userIsEdit=true;
    this.actualIndex=this.listUsers[index].id || 0;
    this.registerForm.setValue(this.listUsers[index])
  }

  cancelEdit(){
    this.formName="Crear Usuario"
    this.buttonName="Crear"
    this.userIsEdit=false;
    this.registerForm.reset();
  }

  readUsers(){
    this.crudService.getAll("user").subscribe(
      {
        next:(data)=>{
          this.listUsers=data;
          console.log(this.listUsers)

        },
        error:(error)=>{
          console.log(error)
        }
      }
    )
  }

  deleteUser(index:number){
    let deleteIndex=this.listUsers[index].id || 0;
    this.crudService.delete(deleteIndex.toString(),"user").subscribe({
      complete:()=>{
        this.readUsers()
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }

}
