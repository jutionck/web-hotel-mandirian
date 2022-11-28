import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TOKEN } from '../auth/model/auth.model';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  onSignedOut(): void {
    sessionStorage.removeItem(TOKEN);
    this.router.navigateByUrl('');
  }

}
