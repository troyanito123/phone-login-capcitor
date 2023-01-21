import { Injectable } from '@angular/core'
import { Auth, signInWithPhoneNumber, signOut } from '@angular/fire/auth'
import { ConfirmationResult, RecaptchaVerifier } from 'firebase/auth'

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private appVerifier?: RecaptchaVerifier
  private confirmationResult?: ConfirmationResult

  constructor(private auth: Auth) {
    this.auth.languageCode = 'es'
  }

  async signInWithPhoneNumber(phoneNumber: string) {
    try {
      if (!this.appVerifier) this.recaptcha()
      const confirmationResult = await signInWithPhoneNumber(
        this.auth,
        phoneNumber,
        this.appVerifier!
      )
      this.confirmationResult = confirmationResult
      return confirmationResult
    } catch (e) {
      throw e
    }
  }

  async verifyOtp(otp: string) {
    try {
      if (!this.appVerifier) this.recaptcha()
      const result = await this.confirmationResult!.confirm(otp)
      return result
    } catch (e) {
      throw e
    }
  }

  public logout(){
    return signOut(this.auth)
  }

  private recaptcha() {
    this.appVerifier = new RecaptchaVerifier(
      'sign-in-button',
      {
        size: 'invisible',
        callback: (response: any) => {
          console.log(response)
        },
        'expired-callback': () => {},
      },
      this.auth
    )
  }
}
