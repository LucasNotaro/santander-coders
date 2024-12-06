import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html',
  imports: [FormsModule,],
})


export class RegisterComponent {
  user = { name: '', username: '', password: '' };

  constructor(private userService: UserService, private router: Router) {}

  register(): void {
    if (!this.user.name || !this.user.username || !this.user.password) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    this.userService.register(this.user).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => alert(err.error.message),
    });
  }
}
