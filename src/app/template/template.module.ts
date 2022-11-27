import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './components/landing/landing.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LandingComponent],
  imports: [CommonModule, RouterModule],
  exports: [LandingComponent],
})
export class TemplateModule { }
