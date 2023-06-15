import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  constructor(private router: Router){}
  
  logIn(email: string, password: string){
    console.log(email, password)
    if(email === 'impulse.guna@gmail.com' && password === 'impulse@123'){
      this.router.navigate(['admin/dashboard'])
    }
    else{
      alert("Go back to reality!")
    }
  }
}
