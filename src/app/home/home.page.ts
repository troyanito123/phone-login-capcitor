import { Component, OnInit } from '@angular/core'
import { User } from '@angular/fire/auth'
import { NavController } from '@ionic/angular'
import { Observable } from 'rxjs'
import { AuthService } from '../services/auth.service'
import { DataService } from '../services/data.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public user$: Observable<User | null>

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private navController: NavController
  ) {
    this.user$ = dataService.user$
  }

  ngOnInit(): void {}

  async logout() {
    await this.authService.logout()
    this.navController.navigateRoot('sign-in')
  }
}
