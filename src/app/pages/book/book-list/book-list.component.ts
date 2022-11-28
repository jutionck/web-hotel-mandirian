import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NIGHTLY_FEE } from 'src/app/shared/utils/nightly-fee.util';
import { IBookListComponent } from '../model/book-component.model';
import { Book } from '../model/book.model';
import { HotelService } from '../service/hotel.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, IBookListComponent {
  bookings: Book[] = [];
  nightlyFee: number = NIGHTLY_FEE;
  baseUrl: string = 'backoffice/book/form'
  constructor(private readonly hotelService: HotelService, private readonly router: Router) { }

  onReserve(booking: Book): void {
    if (booking.status === 'checked-in' || booking.status === 'checked-out') {
      alert(`Tamu ${booking.reserve.name} sudah melakukan ${booking.status} tidak bisa ubah durasi malam`)
    } else {
      this.router.navigateByUrl(`${this.baseUrl}/${booking.id}`);
    }
  }

  onCheckIn(bookingId: number): void {
    this.hotelService.get(bookingId).subscribe({
      next: (booking: Book) => {
        if (booking.status === 'checked-out') {
          alert(`Tamu ${booking.reserve.name} sudah ${booking.status} tidak bisa melakukan checked-in`)
        } else {
          this.hotelService.checkIn(bookingId).subscribe();
          alert(`Tamu ${booking.reserve.name} sudah check-in pada kamar ${booking.roomNumber}.`)
        }
      }
    });
  }

  onCheckOut(bookingId: number): void {
    this.hotelService.get(bookingId).subscribe({
      next: (booking: Book) => {
        if (booking.status === 'reserved') {
          alert(`Tamu ${booking.reserve.name} belum melakukan checked-in pada kamar ${booking.roomNumber}.`);
        } else {
          this.hotelService.checkOut(bookingId).subscribe();
          alert(`Tamu ${booking.reserve.name} sudah check-out pada kamar ${booking.roomNumber}.`);
        }
      }
    });
  }

  onDeleteReservation(bookingId: number): void {
    this.hotelService.get(bookingId).subscribe({
      next: (booking: Book) => {
        if (booking.status !== 'checked-out') {
          alert(`Data pemesanan tidak dapat di hapus karena tamu ${booking.reserve.name} belum checkout.`);
        } else {
          this.hotelService.remove(bookingId).subscribe();
        }
      }
    });
  }

  ngOnInit(): void {
    this.onLoadData();
  }

  onLoadData(): void {
    this.hotelService.list().subscribe({
      next: (bookings: Book[]) => {
        this.bookings = bookings;
      }
    })
  }
}
