import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";
import { SessionService } from "src/app/shared/services/session.service";
import { Book, HOTEL } from "../model/book.model";
import { IHotelService } from "./ihotel.service";

@Injectable()
export class HotelService implements IHotelService {
  bookings: Book[] = [];
  constructor(private readonly sessionService: SessionService) { }

  list(): Observable<Book[]> {
    return new Observable<Book[]>((observer: Observer<Book[]>) => {
      try {
        const sessionBooks: string = this.sessionService.get(HOTEL) as string;
        if (!sessionBooks) {
          const bookings: Book[] = [];
          this.bookings = bookings;
        } else {
          this.bookings = JSON.parse(sessionBooks)
        }
        this.setToStorage();
        return observer.next(this.bookings);
      } catch (err: any) {
        return observer.error(err.message)
      }
    })
  }

  get(bookingId: number): Observable<Book> {
    return new Observable<Book>((observer: Observer<Book>) => {
      try {
        const sessionBooks: string = this.sessionService.get(HOTEL) as string;
        if (sessionBooks) {
          const bookings: Book[] = JSON.parse(sessionBooks);
          const book: Book = bookings.find((b) => b.id === bookingId) as Book;
          observer.next(book);
        }
      } catch (error: any) {
        observer.error(error.message)
      }
    })
  }

  save(booking: Book): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      try {
        if (booking.id) {
          this.bookings = this.bookings.map((t) => {
            if (t.id === booking.id) t = booking;
            return t;
          });
        } else {
          booking.id = this.bookings.length + 1;
          this.bookings.push(booking)
          observer.next();
        }
        this.setToStorage();
      } catch (error: any) {
        observer.error(error.message)
      }
    })
  }

  checkIn(bookingId: number): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      try {
        this.bookings.forEach((b) => {
          if (b.id === bookingId) b.status = 'checked-in';
          this.setToStorage();
          observer.next();
        })
      } catch (err: any) {
        observer.error(err.message);
      }
    });
  }

  checkOut(bookingId: number): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      try {
        this.bookings.forEach((b) => {
          if (b.id === bookingId) b.status = 'checked-out';
          this.setToStorage();
          observer.next();
        })
      } catch (err: any) {
        observer.error(err.message);
      }
    });
  }

  remove(bookingId: number): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      try {
        for (let index = 0; index < this.bookings.length; index++) {
          if (this.bookings[index].id === bookingId) {
            if (this.bookings[index].status === 'checked-out') {
              this.bookings.splice(index, 1);
            }
          }
        }
        this.setToStorage();
        observer.next();
      } catch (err: any) {
        observer.error(err.message)
      }
    })
  }

  private setToStorage(): void {
    this.sessionService.set(HOTEL, JSON.stringify(this.bookings));
  }
}