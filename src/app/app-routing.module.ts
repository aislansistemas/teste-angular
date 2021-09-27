import { NgModule, Component } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ListComponent } from './components/user/list/list.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    data: {
      title: 'Lista de usuário'
    }
  },
  {
    path: 'create-user',
    component: RegisterComponent,
    data: {
      title: 'Cadastrar de usuário'
    }
  },
  {
    path: 'edit-user/:userId',
    component: RegisterComponent,
    data: {
      title: 'Editar de usuário'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
