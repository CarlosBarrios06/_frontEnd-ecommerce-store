import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';


export class Img {
  base: string;
};


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  imgs: Img[] = []
  preview: Img;
  loading: boolean;
  constructor(
    private api: ApiService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
  }

  loadImage(event: any) {

    let files = event.target.files[0]
    console.log(files)
    this.extract64Base(files).then((img: any) => {
      this.preview = img.base;
      const file: Img = {
        base: img.base
      }
      this.imgs.push(file);
    })

    // let reader = new FileReader();
    // reader.readAsDataURL(files)
    // reader.onloadend = () => {

    // }
    // console.log(reader.result);
  }

  extract64Base = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          blob: $event,
          image,
          base: reader.result
        });
      };
    } catch (e) {
      return null;
    }
  })

  uploadFile() {
    const img = {
      base: this.imgs[0].base
    };
    this.api.sendPost('post-img/', img).subscribe(res => {
      this.loading = false;
      console.log('Server Request', res);
    })

    // try{
    //   this.loading = true
    //   const dataForm = new FormData();
    //   this.imgs.forEach((img:Img) => {
    //     console.log(img);
    //     dataForm.append('file', img)
    //   })
    //   this.api.sendPost('post-img/',dataForm).subscribe(res =>{
    //     this.loading = false;
    //     console.log('Server Request', res);
    //   })
    // }catch(e){
    //   this.loading = false;
    //   console.log('ERROR', e)
    // }
  }

}
