import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { SubscriptionsContainer } from 'src/app/shared/helpers/subscriptions-container';
import { User } from '../../../../shared/Models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  users:User[] = [];
  p: number = 1; 
  subs = new SubscriptionsContainer();

  constructor(private api: ApiService, private notification: ToastrService,) {
  
   }
  ngOnDestroy(): void {
    this.subs.dispose();
  }

  ngOnInit(): void {
    this.loadData();  
  }

  deleteUser(id: string) {
    this.subs.add = this.api.sendDelete('delete-user/' + id)
      .subscribe(res => {
        this.notification.success("employee deleted successfully");
        this.loadData()
      }, error => {
        this.notification.error('error to delete product')
      })
  };

  loadData() {
   this.subs.add = this.api.sendGet('get-users').subscribe((res: any) => {
      this.users = res.data;
    }, error => {
      this.notification.error("Error", error)
      console.log('algo salio mal', error)
    })
  }; 

}
