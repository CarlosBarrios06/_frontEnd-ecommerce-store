import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { Product } from 'src/app/modules/product/models/product.model';
import { debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs/operators';
import { fromEvent, merge } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild("searchInput", { static: true }) searchInput: ElementRef;
  products: Product[] = [];
  p: number = 1;
  collection: any[];
  loading: boolean = false
  search: string = '';
  id: any

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    merge(fromEvent(this.searchInput.nativeElement, 'keydown')).pipe(
      startWith({}),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(event => {
        if (this.searchInput.nativeElement.value === '') {
          return this.api.sendGet('get-products')
        } else {
          this.loading = true
          return this.api.sendGet(`product-by-name/${this.searchInput.nativeElement.value.trim()}`)

        }
      })
    ).subscribe({
      next: res => {
        if (res.length <= 1) {
          this.products = res;
          this.loading = false;
        } else {
          this.products = res;
          this.getProducts();
          this.loading = false;
        }

      },
      error: err => {
        console.log(err);
        this.loading = false
      }
    })
    this.id = this.route.snapshot.paramMap.get('id')!
    this.getProducts();
  }

  getInformation(id: any) {
    this.router.navigate(['/product/show-product/' + id])
  }

  getProducts() {
    if (this.id) {
      this.api.sendGet(`get-product-by-category/${this.id}`).subscribe(res => {
        if (res.length === 0) {
          this.api.sendGet(`get-product-by-brand/${this.id}`).subscribe(res => {
            this.products = res;
          })
        } else {
          this.products = res;
        }
      })
    } else {
      this.api.sendGet('get-products').subscribe((res: any) => {
        this.products = res.data;
      })
    }
  }

}
