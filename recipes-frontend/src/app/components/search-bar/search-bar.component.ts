import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Input() immediate: boolean = false;
  
  searchValue: string = "";
  
  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      if (params.search) {
        this.searchValue = params.search;
      }
    });
  }

  search() {
    if (this.searchValue) {
      this.router.navigate(['/'], { queryParams: { search: this.searchValue } });
    }
    else {
      this.router.navigate(['/']);
    }
  }

  immediateSearch() {
    if (this.immediate) {
      this.search();
    }
  }
}
