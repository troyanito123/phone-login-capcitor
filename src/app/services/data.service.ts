import { Injectable } from '@angular/core'
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _user: User | null = null
  private _user$ = new BehaviorSubject<User | null>(null)

  get user() {
    return this._user
  }

  get user$() {
    return this._user$.asObservable()
  }

  constructor(private auth: Auth) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this._user$.next(user)
      } else {
        this._user$.next(null)
      }
    })
  }
}
