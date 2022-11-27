import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';
import { StringFormatService } from './services/string-format.service';
import { SessionService } from './services/session.service';


@NgModule({
  declarations: [ValidationMessageComponent],
  imports: [
    CommonModule
  ],
  exports: [ValidationMessageComponent],
  providers: [StringFormatService, SessionService]
})
export class SharedModule { }
