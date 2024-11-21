import { Component } from '@angular/core';
import { DadosService } from '../dados.service';
import { Router } from '@angular/router';
import { MateriaService } from '../materia.service';
import { Materia } from '../materia';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  template: `
    <!-- <section>
      <h2>Faça login para continuar...</h2>
      <form class="login" >
        <input class="login-usuario" type="text" placeholder="Usuário" > <br>
        <input class="login-senha" type="password" placeholder="Senha" > <br>
        <button class="login-botao" type="button" (click)="enviarLogin()">Confirmar</button>
        <p class="aguarde" >Aguarde...</p>
      </form>
    </section> -->
    <div class="contem"><section class="conteudo">
        <form class="login">
          <h2>Faça login para continuar</h2>
          <input class="login-usuario" type="text" placeholder="Usuário" >
          <input class="login-senha" type="password" placeholder="Senha" >
          <button class="login-botao" type="button" (click)="enviarLogin()" >Confirmar</button>
          <p class="aguarde" >Aguarde...</p>
        </form>
      </section>
    </div>
      
      
  `,
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private dadosService: DadosService, 
              private router: Router,
              private materiaService: MateriaService) {}

  // enviarLogin() {
  //   alert((document.getElementsByClassName('login-usuario')[0] as HTMLInputElement).value);
  // }

  enviarLogin() {
    const login =  {
          usuario: (document.getElementsByClassName('login-usuario')[0] as HTMLInputElement).value,
          senha: (document.getElementsByClassName('login-senha')[0] as HTMLInputElement).value
          }
    console.log('botão clicado');
    const a = (document.getElementsByClassName('aguarde')[0] as HTMLElement)
    const botaoConfima = (document.getElementsByClassName('login-botao')[0] as HTMLElement)

    // const jsonteste = {
    //   id: 0,
    //   nome: 'MATERIA TESTE',
    //   nota: 'NOTA 10',
    //   abc: 'A'
    // }
    
    if (a.style.display == 'none'){
          a.style.display = 'flex';
    }
    else {
          a.style.display = 'none'
    };

    this.dadosService.enviarLogin(login).subscribe(resposta => {
        console.log(resposta);
        if (resposta == 'Falha'){
          console.log('Falhou')
        }else {
          console.log(resposta.materias)
          console.log(resposta.nome)
          this.materiaService.atualizaMaterias(resposta.materias);
          this.materiaService.atualizaNomes(resposta.nome);
          
          // this.materiaService.atualizaMaterias([jsonteste]);
          console.log(this.materiaService.getAllMaterias());
          this.router.navigate(['./dashboard']); // tem que fazer um "if resposta == deu_certo
        }
        
      },
      erro => {
        console.error('Erro ao enviar dados:', erro);
      }
    );
    console.log('fim do botão');
  }

  title = 'Login';
}
