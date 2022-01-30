import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users:User[] = [];
  p: number = 1;
 
  constructor(private api: ApiService, private notification: ToastrService) {
  
   }

  ngOnInit(): void {
    this.loadData()
  }

  deleteUser(id: any) {
    this.api.sendDelete('delete-user/' + id)
      .subscribe(res => {
        this.notification.success("employee deleted succefully");
        this.loadData()
      }, error => {
        this.notification.error('error to delete product')
      })
  };

  loadData() {
    this.api.sendGet('get-users').subscribe((res: any) => {
      this.users = res.data;
    }, error => {
      this.notification.error("Error", error)
      console.log('algo salio mal', error)
    })
  };

 

}
