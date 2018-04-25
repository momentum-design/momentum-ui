import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CardComponent } from '@collab-ui/angular';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../../shared/data/data.service';

@Component({
  selector: 'docs-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, OnChanges {
  category: any = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
  ) {}

  ngOnChanges(changes) {
    console.log(changes);
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      const catId = this.route.snapshot.params.category;
      this.getCategoryInfo(catId);
    });
  }

  getCategoryInfo(catId) {
    this.dataService
      .getCategory(catId)
      .then(cat => {
        this.category = cat;
        console.log(this.category);
      })
      .catch(err => {
        const navigationExtras: NavigationExtras = {
          queryParams: {
            category: catId,
          },
        };

        this.router.navigate(['/not-found'], navigationExtras);
      });
  }
}
