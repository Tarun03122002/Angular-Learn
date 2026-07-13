import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LoggerService {

    http: HttpClient = inject(HttpClient)

    logErrorInDB(data: { status: number, message: string, dateTime: Date }) {
        this.http.post('https://httpclient-4723f-default-rtdb.firebaseio.com/logs.json', data).subscribe()
    }

    fetchErrors() {
        this.http.get('https://httpclient-4723f-default-rtdb.firebaseio.com/logs.json').subscribe()

    }
}