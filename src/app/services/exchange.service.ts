import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Currency, Rate } from '../models';
import { catchError, map, of, tap, throwError } from 'rxjs';
import { ErrorService } from './error.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  ratesCache: Record<string, Rate> = {};
  private apiUrl: string;

  constructor(private http: HttpClient, private errorService: ErrorService) {
    this.apiUrl = environment.apiUrl;
  }

  getRate(base: Currency, target: Currency) {
    if (this.ratesCache[base + target]) {
      return of(this.ratesCache[base + target]);
    }
    return this.http.get<Rate>(`${this.apiUrl}/pair/${base}/${target}`).pipe(
      tap((rate) => (this.ratesCache[base + target] = rate)),
      catchError(this.errorHandler.bind(this))
    );
  }

  private errorHandler(err: HttpErrorResponse) {
    this.errorService.handle(err.message);
    return throwError(() => err.message);
  }
}
