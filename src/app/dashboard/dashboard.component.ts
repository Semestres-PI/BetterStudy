import { Component } from '@angular/core';
import { MateriaComponent } from "../materia/materia.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MateriaComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
