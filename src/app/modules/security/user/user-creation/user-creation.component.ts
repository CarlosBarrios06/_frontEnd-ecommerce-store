import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ApiService } from 'src/app/core/services/api.service';



@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.scss']
})
export class UserCreationComponent implements OnInit {
  userForm: FormGroup
  modalRef?: BsModalRef;
  id: string;
  title: string = 'Create User'

  constructor(private api: ApiService, private router: Router, private notification: ToastrService,
    private uf: FormBuilder, private modalService: BsModalService, private route: ActivatedRoute) {
    this.userForm = this.uf.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', [Validators.required]]
    })

    this.id = this.route.snapshot.paramMap.get('id')!
  }

  ngOnInit(): void {
    this.isEdit()
  }


  addUser() {
    const USER: any = {
      name: this.userForm.get('name')?.value,
      email: this.userForm.get('email')?.value,
      password: this.userForm.get('password')?.value,
      repeatPassword: this.userForm.get('repeatPassword')?.value,
    };
    if (this.id !== null) {
      if (USER.password === USER.repeatPassword) {
        console.log(this.id)
        this.api.sendPut(`update-user/${this.id}`, USER).subscribe(data => {
          this.notification.info("User Updated Successfully", "User Updated")
          this.router.navigate(['/'])
        }, error => {
          this.notification.error("Error", "User no Updated")
          console.log('algo salio mal')
          // this.userForm.reset();
        })
      } else {
        alert('las contraseñas no coinciden')
      }



    } else {

      if (USER.password === USER.repeatPassword) {
        this.api.sendPost('create-user', USER).subscribe((res) => {          
          this.notification.success('Registro satisfactorio', 'usuario añadido con exito!!!')
          this.userForm.reset();
          this.router.navigate(['/security/login'])
        }, error => {
          console.log('algo salio mal')
        })
      } else {
        alert('las contraseñas no coinciden')
      }
    };
  };

  isEdit() {
    if (this.id !== null) {
      this.title = 'Edit User'
      console.log(this.id);
      this.api.sendGet(`get-user/${this.id}`).subscribe((res: any) => {
        this.userForm.setValue({
          name: res.name,
          email: res.email,
          password: res.password,
          repeatPassword: 0
        })
      }, error => {
        this.notification.error('errr', error);
        console.log(error);
      }
      )
      // let object = this.productos.filter((producto: { _id: any; }) => {
      //   return producto._id === this.id;
      // })
    }
  };


}
