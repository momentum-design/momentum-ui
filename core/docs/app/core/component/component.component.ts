import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router, } from '@angular/router';
import { find } from 'lodash';
import { DataService } from '../../shared/data/data.service';

export interface IComponent {
  name: string;
  component: string;
  description: string;
  sections?: Array<any>;
}

@Component({
  selector: 'docs-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss']
})
export class ComponentComponent implements OnInit {
  public component: IComponent;
  public showCode = false;
  public showCodeButton = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
  ) {
    this.component = {
      name: '',
      component: '',
      description: '',
    };
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const componentId = this.route.snapshot.params.component;
      const catId = this.route.snapshot.params.category;
      this.getComponentInfo(catId, componentId);
    });
  }

  getComponentInfo(catId, componentId) {
    this.dataService.getComponent(catId, componentId)
      .then(response => {
        this.component = response;
        this.showCodeButton = find(this.component.sections, 'examples');
        console.log(this.component)
      })
      .catch(error => {
        const navigationExtras: NavigationExtras = {
          queryParams: {
            category: catId,
            component: componentId,
          }
        };
        this.router.navigate(['/not-found'], navigationExtras);
    });
  }
}
