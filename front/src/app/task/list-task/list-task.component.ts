import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit {

  tasks: any = [] 

  constructor(private taskService: TaskService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    this.taskService.getTasks()
      .subscribe(
        res=>{
          this.tasks = res
        },
        err=> console.log(err)
      )
  }

  changeStatus(selectTask: any, status: any){
    const temporalStatus = selectTask.status
    selectTask.status = status
    this.taskService.editTask(selectTask)
      .subscribe(
        res=>{
          selectTask.status = status
        },
        err=>{
          console.log(err)
          selectTask.status = temporalStatus
          if(err instanceof HttpErrorResponse){
            if(err.status === 401){
              this.snackBar.open("No estas logeado... Enviando a Login", "X", {
                duration: 2000
              })
              this.router.navigate(['/login'])
            }
          }
        }
      )
  }
  delete(deleteTask: any){
    this.taskService.deleteTask(deleteTask)
      .subscribe(
        res=>{
          const index = this.tasks.indexOf(deleteTask)
          if(index>-1){
            this.tasks.splice(index,1)
            this.snackBar.open("Tarea Borrada", "X", {
              duration: 2000
            })
          }
        },
        err=>{
          console.log(err)
          if(err instanceof HttpErrorResponse){
            if(err.status === 401){
              this.snackBar.open("No estas logeado", "X", {
                duration: 2000
              })
              this.router.navigate(['/login'])
            }
          }
        }
      )
  }

}
