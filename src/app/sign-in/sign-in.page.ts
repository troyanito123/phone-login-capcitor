import { Component, OnInit } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { NavController } from '@ionic/angular'
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  public phoneInput = new FormControl('+59171456937', [Validators.required])
  public codeInput = new FormControl('', [Validators.required])
  constructor(private authService: AuthService, private navController: NavController) {}

  ngOnInit() {}

  public async signInByPhone() {
    if (this.phoneInput.invalid) {
      this.phoneInput.markAsTouched()
      return
    }
    console.log(this.phoneInput.value)
    try {
      const res = await this.authService.signInWithPhoneNumber(
        this.phoneInput.value!
      )
      console.log(res)
    } catch (error) {
      console.warn(error)
    }
  }

  public async confirm() {
    if (this.codeInput.invalid) {
      this.codeInput.markAsTouched()
      return
    }
    try {
      const user = await this.authService.verifyOtp(this.codeInput.value!)
      this.navController.navigateRoot('home')
    } catch (error) {
      console.warn(error)
    }
  }
}
