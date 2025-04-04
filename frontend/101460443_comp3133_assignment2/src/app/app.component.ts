import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="content">
      <router-outlet></router-outlet>
    </div>

    <footer style="text-align: left; padding: 1rem; background: #f3f3f3;">
      <h3>Employee Management App</h3>
      <p>Ryan Tran - 101460443</p>
      <p>Winter 2025</p>
    </footer>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
