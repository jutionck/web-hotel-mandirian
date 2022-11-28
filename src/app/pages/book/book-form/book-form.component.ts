import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TOKEN } from 'src/app/auth/model/auth.model';
import { SessionService } from 'src/app/shared/services/session.service';
import { NIGHTLY_FEE } from 'src/app/shared/utils/nightly-fee.util';
import { IBookFormComponent } from '../model/book-component.model';
import { Book } from '../model/book.model';
import { HotelService } from '../service/hotel.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
})
export class BookFormComponent implements OnInit, IBookFormComponent {
  nightlyFee: number = NIGHTLY_FEE;
  booking?: Book;

  constructor(
    private readonly sessionService: SessionService,
    private readonly hotelService: HotelService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) { }

  bookingGroup: FormGroup = new FormGroup({
    id: new FormControl(null),
    roomNumber: new FormControl(null, [Validators.required, Validators.min(1)]),
    duration: new FormControl(null, [Validators.required, Validators.min(1)]),
    guestCount: new FormControl(null, [Validators.required, Validators.min(1)]),
    status: new FormControl('reserved'),
    reserve: new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required]),
    }),
  });

  onSubmitReservation(): void {
    const payload = this.bookingGroup.value;
    const { reserve, roomNumber, duration } = payload;
    const totalPrice = duration * NIGHTLY_FEE;
    this.hotelService.save(payload).subscribe({
      next: () => {
        alert(
          `Tamu ${reserve.name} telah melakukan pemesanan untuk kamar ${roomNumber} selama ${duration} malam dengan total tagihan sebesar ${totalPrice}.`
        );
      },
    });
    this.router.navigateByUrl('backoffice/book');
  }

  onFormReset(): void { }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params: Params) => {
        const { id } = params;
        if (id) {
          this.hotelService.get(+id).subscribe({
            next: (booking: Book) => {
              this.booking = booking;
              this.setFormValue(this.booking);
            }
          })
        }
      }
    });
    if (!this.sessionService.get(TOKEN)) this.router.navigateByUrl('/auth/login')
  }

  isFormValid(field: string): boolean {
    const control: AbstractControl = this.bookingGroup.get(
      field
    ) as AbstractControl;
    return control && control.invalid && (control.dirty || control.touched);
  }

  setFormValue(book: Book): void {
    if (book) {
      const { id, reserve, guestCount, duration, roomNumber } = book;
      this.bookingGroup.get(['id'])?.setValue(id);
      this.bookingGroup.get(['reserve', 'name'])?.setValue(reserve.name);
      this.bookingGroup.get(['reserve', 'email'])?.setValue(reserve.email);
      this.bookingGroup.get(['reserve', 'phone'])?.setValue(reserve.phone);
      this.bookingGroup.get(['guestCount'])?.setValue(guestCount);
      this.bookingGroup.get(['roomNumber'])?.setValue(roomNumber);
      this.bookingGroup.get(['duration'])?.setValue(duration);
    }
  }
}
