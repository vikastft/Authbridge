import { Injectable } from '@angular/core';
import { HttpService } from './services/http.services';


@Injectable()
export class DashboardService {

  constructor(private http: HttpService) { }

  getDashboardData() {
    return this.http.get('/getLogs');
  }
}
