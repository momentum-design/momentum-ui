import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { CardComponent } from '@collab-ui/angular';

@Component({
  selector: 'docs-not-found',
  templateUrl: './not-found.component.html',
  styles: []
})
export class NotFoundComponent implements OnInit {
  public title = 'Not Found';
  public category;
  public component;
  public angularLink;
  public angularJsLink;
  public reactLink;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.category = params.category;
        this.component = params.component;
      });


  }
}
