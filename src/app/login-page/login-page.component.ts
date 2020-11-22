import {Component, OnInit} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../shared/interfaces';
import {DateService} from '../shared/services/date.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router,
    private dateService: DateService,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      userName: new FormControl(null, [
        Validators.required,
        Validators.email]),
      userPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(4)
      ])
    });
  }

  submit(): void {

    console.log('submit');

    if (this.form.invalid) {
      return;
    }

    const user: User = {
      userName: this.form.value.userName,
      userPassword: this.form.value.userPassword
    };

    const dateStr = this.datePipe.transform(this.dateService.currentDate(), 'yyyy-MM-dd');

    this.auth.login(user).subscribe(() => {
      this.form.reset();
      this.router.navigate([`/ration/` + dateStr]);
    });
  }

  registration(): void {

    const user: User = {
      userName: this.form.value.userName,
      userPassword: this.form.value.userPassword
    };

    this.auth.registration(user).subscribe();
  }
}
