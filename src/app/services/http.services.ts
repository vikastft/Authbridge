import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HttpService {
    baseUrl = 'http://192.168.103.92:5000';
    result: any;
    constructor(
        private http: HttpClient
    ) { }

    get(url: string, options?: any): Observable<any> {
        url = this.baseUrl + url;
        return this.handleResponse(this.http.get(url, options));
    }

    post(url: string, data?: any, options?: any): Observable<any> {
        if (!data) {
            data = {};
        }
        //data.Token = this.storage.api.session.get('Token');
        const body = JSON.stringify(data);
        // this.startMonitoring();
        // if (!this.baseUrl) {
        //     this.baseUrl = this.storage.api.session.get('BaseResolve').baseUrl;
        // }
        url = this.baseUrl + url;
        return this.handleResponse(
            this.http.post(url, body, this.getRequestOptions(options))
        );
    }

    // put(url: string, data: any, options?: any): Observable<any> {
    //     const body = JSON.stringify(data);

    //     return this.handleResponse(this.http.put(url, body, options));
    // }

    delete(url: string, options?: any): Observable<any> {
        return this.handleResponse(this.http.delete(url, options));
    }

    getRequestOptions(options: any) {
        options = options || {};
        if (options.headers) {
            options.headers = options.headers.append(
                'Content-Type',
                'application/json'
            );
        } else {
            options.headers = new HttpHeaders();
            options.headers = options.headers.append(
                'Content-Type',
                'application/json'
            );
        }
        return options;
    }

    handleResponse(
        observable: Observable<any>,
        spinner: boolean = true
    ): Observable<any> {
        return observable
            .map(res => {
                return this.extractData(res);
            })
            .catch((err, source) => {
                if (err.status === 401) {
                    // if (err.url.endsWith('/login')) {
                    //     return Observable.throw(err);
                    // }
                    // this.storage.api.session.clear();
                    // this.router.navigate(['/login']);
                    return Observable.empty();
                } else {
                    return Observable.throw(err);
                }
            })
            .finally(() => {
                // if (spinner) {
                //     this.spinner.decreasePendingRequest();
                // }
            });
    }

    extractData(response: any) {
        return response || {};
    }

    handleError(error: any) {
        try {
            let errMsg =
                JSON.parse(error._body).errorMessage ||
                JSON.parse(error._body).error ||
                error.json().error_description;
            const errorPrefix = 'An error occurred: ';
            console.log(errorPrefix, errMsg);
            return Observable.throw(errMsg);
        } catch (exception) {
            const errMessage =
                'A temporary error occurred on server, please try later';
            console.log(errMessage, exception);
            return Observable.throw(errMessage);
        }
    }
}
