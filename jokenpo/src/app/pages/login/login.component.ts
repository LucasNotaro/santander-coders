import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  styleUrl: './login.component.scss',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule],
})
export class LoginComponent {
  credentials = { username: '', password: '' };

  constructor(private userService: UserService, private router: Router) {}

  login(): void {
    if (!this.credentials.username || !this.credentials.password) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    this.userService.login(this.credentials).subscribe({
      next: (response) => {
        localStorage.setItem('authToken', response.accessToken);
        localStorage.setItem('loggedUser', JSON.stringify(response.user));
        this.router.navigate(['/home']);
      },
      error: (err) => alert(`Erro no login: ${err.error.message}`),
    });
  }

}
