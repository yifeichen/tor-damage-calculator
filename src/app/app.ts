import { Component, signal } from '@angular/core';
import { PhysicalDamageComponent } from './physical-damage';

@Component({
  selector: 'app-root',
  imports: [PhysicalDamageComponent],
  template: '<app-physical-damage></app-physical-damage>',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tor-damage-calculator');
}
