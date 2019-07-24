import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MatTableModule, MatFormFieldModule, MatInputModule, MatSortModule, MatPaginatorModule } from '@angular/material';
import { DashboardService } from './app.service';
import { HttpService } from './services/http.services';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    HttpClientModule
  ],
  providers: [DashboardService, HttpService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
