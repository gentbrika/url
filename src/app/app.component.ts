import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  mainUrl:any = "http://localhost:4200/"
  url:any = '';
  loading:any = false;
  allUrls:any = [];
  showDetails:any = false;
  randTxt:any = '';
  myAngularxQrCode: any = '';

  orderForm = new FormGroup({
    websiteUrl: new FormControl('',[
      Validators.required, Validators.pattern(/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/)
    ]),
    short: new FormControl('',[
    ]),
    shortId: new FormControl('',[
    ])
  })
  
  constructor(private http: HttpClient, private router: Router, private clipboard: Clipboard){}

  ngOnInit() {
  }

  generateUrl(a:any){   
    let randomText = Math.random().toString(36).substr(2, 9);
    this.randTxt = this.mainUrl + randomText;
    this.orderForm.value.short = `${this.mainUrl + randomText}`;
    this.orderForm.value.shortId = randomText;
    this.myAngularxQrCode = this.randTxt;

    this.http.post('http://localhost:3000/shortenedUrls', a).subscribe(res => { })

    this.http.get('http://localhost:3000/shortenedUrls').subscribe(res => {
      this.allUrls = res;

      this.allUrls.forEach((el:any) => {
        // this.loading = true;
        console.log(el);
        if(el.websiteUrl == this.orderForm.value.websiteUrl){
          // this.router.navigate([`/${randomText}`])
          this.showDetails = true;
        }
        // this.loading = false;

      });
    })
  }

  copyText() {
    this.clipboard.copy(this.randTxt);
  }
}
