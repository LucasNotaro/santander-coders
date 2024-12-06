import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  title = 'jokenpo';
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.validateToken().subscribe((isValid) => {
      if (!isValid) {
        console.log('Token inválido ou expirado!');
      }
    });
  }
}
