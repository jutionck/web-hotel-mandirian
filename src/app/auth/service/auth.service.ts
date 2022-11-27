import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { SessionService } from 'src/app/shared/services/session.service';
import { Auth } from '../model/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly sessionService: SessionService) { }
  login(payload: Auth): Observable<string | null> {
    return new Observable<string | null>((observer: Observer<string | null>) => {
      try {
        const { username, password } = payload;
        if (username === 'admin@gmail.com' && password === 'password') {
          const token = 'enigma-123'
          this.sessionService.set('token', JSON.stringify(token));
          observer.next(token);
        } else {
          observer.next(null);
        }
      } catch (error: any) {
        observer.error(error.message);
      }
    })
  }
}
