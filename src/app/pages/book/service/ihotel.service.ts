import { Observable } from "rxjs";
import { Book } from "../model/book.model";

export interface IHotelService {
  bookings: Book[];
  list(): Observable<Book[]>;
  get(bookingId: number): Observable<Book>
  save(booking: Book): Observable<void>
  checkIn(bookingId: number): Observable<void>
  checkOut(bookingId: number): Observable<void>
  remove(bookingId: number): Observable<void>
}