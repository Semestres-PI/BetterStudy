import { Injectable } from '@angular/core';
import { Materia, Nome } from './materia';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  protected materiaList: Materia[] = [
    
  // {
  //   'id': 0,
  //   'nome': 'Manejos Agrícolas de Trato Culturais e Colheita',
  //   'nota': "4.7",
  //   'abc': 'A'
  // },
  // {
  //   'id': 1,
  //   'nome': 'Empreendedorismo',
  //   'nota': "4.3",
  //   'abc': 'A'
  // },
  // {
  //   'id': 2,
  //   'nome': 'Redes de Computadores',
  //   'nota': "3.5",
  //   'abc': 'B'
  // },
  // {
  //   'id': 3,
  //   'nome': 'Web Semântica',
  //   'nota': "2.1",
  //   'abc': 'C'
  // },
  // {
  //   'id': 4,
  //   'nome': 'Algoritmos Avançados',
  //   'nota': "3.5",
  //   'abc': 'B'
  // },
  ]; 
  protected nomeList: Nome[] = [];

  constructor() { }

  getAllMaterias(): Materia[] {
    return this.materiaList;
  }

  getMateriaById(id: Number): Materia |
  undefined {
    return this.materiaList.find(materia => materia.id === id)
  }
  
  atualizaMaterias(data: Materia[]): void {
    this.materiaList = data;
  }

  
  getAllNomes(): Nome[] {
    return this.nomeList;
  }

  atualizaNomes(data: Nome[]): void {
    this.nomeList = data;
  }

}
