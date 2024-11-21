import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Materia } from '../materia'

@Component({
  selector: 'app-materia',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="materia">
      
        <div class="grid-item">
          <h4 class="materia-nome">{{mat.nome}}</h4>
          <p class="materia-nota">Nota: {{mat.nota}}</p>
          <p>Classificação ABC: {{mat.abc}}</p>
        </div>
      
    </section>
  `,
  styleUrl: './materia.component.scss'
})
export class MateriaComponent {
  @Input() mat!:Materia;
}
