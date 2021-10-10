import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LineGrapherLiteModule } from '../../../d9yuan/line-grapher-lite/src/lib/line-grapher-lite.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LineGrapherLiteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
