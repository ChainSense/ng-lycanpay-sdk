import { NgModule } from '@angular/core';
import { NgLycanpayComponent } from './ng-lycanpay.component';
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    NgLycanpayComponent
  ],
  imports: [
    HttpClientModule
  ],
  exports: [
    NgLycanpayComponent
  ]
})
export class NgLycanpayModule { }
