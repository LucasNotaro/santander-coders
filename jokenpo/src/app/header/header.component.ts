import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [CommonModule, RouterModule],
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  constructor(public authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Redireciona para login
  }

  login(): void {
    this.router.navigate(['/login']); // Redireciona para a página de login
  }

  register(): void {
    this.router.navigate(['/register']);
  }
}
