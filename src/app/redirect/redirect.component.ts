import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {
  allUrls:any = {};
  urlThatContainsId:any = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');

    this.http.get('http://localhost:3000/shortenedUrls').subscribe(res => {
      this.allUrls = res;

      this.allUrls.forEach((el:any) => {
        if (Object.values(el).indexOf(id) > -1) {
          this.urlThatContainsId.push(el);

          let url = this.urlThatContainsId[0].websiteUrl;
          window.location.href = url;
        }
      });
    })
  }
}
