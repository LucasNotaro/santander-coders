import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  user: any = null;
  users: any[] = [];

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    const token = this.authService.getToken();
    if (token) {
      const userId = this.decodeToken(token).sub;
      this.fetchLoggedUser(userId);
      this.fetchAllUsers();
    }
  }

  fetchLoggedUser(userId: string): void {
    this.userService.getUserById(userId).subscribe({
      next: (user) => {
        this.user = user;
        console.log('Usuário logado retornado pelo backend:', this.user);
      },
      error: () => alert('Erro ao carregar informações do usuário logado'),
    });
  }

  fetchAllUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users.filter((user) => user.id !== this.user?.id);
        console.log('Lista de usuários recebida:', this.users);
      },
      error: () => alert('Erro ao carregar a lista de usuários'),
    });
  }

  getUserImage(imagePath: string | null | undefined): string {
    if (imagePath && !imagePath.startsWith('images/')) {
      imagePath = `images/${imagePath}`;
    }

    const finalPath =
      imagePath && imagePath.trim() !== ''
        ? `http://localhost:3000/${imagePath}`
        : 'http://localhost:3000/images/default.png';

    return finalPath;
  }

  capitalizeFirstLetter(name: string): string {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  decodeToken(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }
}
