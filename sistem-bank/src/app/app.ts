import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./shared/components/navbar/navbar";
import { MainDiretivasAngularMaterial } from "./shared/components/main-diretivas-angular-material/main-diretivas-angular-material";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, MainDiretivasAngularMaterial],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  public title = 'sistem-bank';

  count = signal(0);

  increment() {
    this.count.update((value) => value + 1);
  }
}
