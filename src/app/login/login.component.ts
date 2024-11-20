import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  template: `
      <header>
         <div class="better">
            <img class="logo-marca" src="../public/betterstudy-logo.ico" alt="logo">
            <span>BetterStudy</span>
         </div>
      </header>
    <div class="contem">
      <section class="conteudo">
        <form>
          <h2>Faça login para continuar</h2>
          <input type="text" placeholder="Usuário" >
          <input type="text" placeholder="Senha" >
          <button class="primario" type="button">Confirmar</button>
        </form>
     </section>  
    </div>
  `,
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
