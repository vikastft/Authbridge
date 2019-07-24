import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DashboardService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  baseUrl = 'http://192.168.103.92:5000/';
  // data = [{ date: '10/9/2011', isMatch: true, message: 'test', score: 45.364, image1: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png', image2: '', type: 'DL' },
  // { date: '11/9/2018', isMatch: false, message: 'response', score: 21.07, image1: '', image2: '', type: 'Aadhar' }];
  displayedColumns: string[] = ['date', 'isMatch', 'response', 'score', 'image1', 'image2', 'type'];
  dataSource: MatTableDataSource<any>;

  constructor(private dashboardService: DashboardService) {

  }
  ngOnInit() {
    //this.dataSource = new MatTableDataSource(this.data);
    this.dashboardService.getDashboardData().subscribe(response => {
      if (response) {
        const modifiedData = response.data.map(res => {
          if (res.image1) {
            res.image1 = `${this.baseUrl}${res.image1}`;
          }
          if (res.image2) {
            res.image2 = `${this.baseUrl}${res.image2}`;
          }
          return res;
        });
        this.dataSource = new MatTableDataSource(modifiedData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
