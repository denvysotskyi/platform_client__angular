import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { registerAction } from '../../store/actions/actions'
import { isSubmittingSelector } from '../../store/selectors/selectors'
import { AppStateInterface } from '../../../shared/types/appState.interface'
import { RegisterRequestInterface } from '../../interfaces/registerRequest.interface'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  form: FormGroup
  isSubmitting$: Observable<boolean>

  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateInterface>,
  ) {}

  ngOnInit(): void {
    this.initializeForm()
    this.initializeValues()
  }

  initializeForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
  }

  onSubmit(): void {
    const request: RegisterRequestInterface = {
      user: this.form.value
    }

    this.store.dispatch(registerAction( { request }))
    this.form.reset()
  }
}
