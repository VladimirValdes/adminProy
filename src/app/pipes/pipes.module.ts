import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgenPipe } from './imgen.pipe';



@NgModule({
  declarations: [
    ImgenPipe
  ],
  imports: [
    CommonModule

  ],
  exports: [
    ImgenPipe
  ]
})
export class PipesModule { }
