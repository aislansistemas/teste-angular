import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { CreateUserCommand } from 'src/app/commands/create-user.command';
import { User } from 'src/app/models/user';
import { UserService } from '../../../services/user.service';
import { BaseComponent } from '../../base.component';
import { UpdateUserCommand } from '../../../commands/update-user.command';

@Component({
  selector: 'app-create',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent extends BaseComponent implements OnInit {

  createUserForm: any;
  feedbackMessage: string = '';
  hasMessage: boolean = false;
  colorContentMessage: string = '';
  userId: number = 0;
  user:User = new User();
  textAction: string = "Cadastrar";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private activetedRoute: ActivatedRoute
  ) { 
    super();
  }

  ngOnInit(): void {
    this.userId = this.activetedRoute.snapshot.params.userId;

    this.createUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      job: ['', Validators.required]
    });

    if(this.userId > 0) {  
      this.userService.getById(this.userId)
        .subscribe(result => { 
          this.user = result.data
          this.createUserForm = this.formBuilder.group({
            name: [this.user.first_name, Validators.required],
            job: [this.user.job, Validators.required]
          });
        });

      this.textAction = "Editar";
    } 
  }

  save(): void {
    if(this.userId > 0) {
      this.update();
    } else {
      this.create();
    }
  }

  create(): void {

    if(this.createUserForm.valid && !this.createUserForm.pending) {
      var userCommand = this.createUserForm.getRawValue() as CreateUserCommand;

      this.userService.create(userCommand)
        .subscribe(
          result => {
            this.processFeedback("Usuário cadastrado com sucesso!", "success");
            setTimeout(() => {
              this.router.navigate(['']);
            }, 2500);
          },
          failure => {
            this.processFeedback("Ops! ocorreu um erro ao tentar cadastrar o usuário", "danger");
          }
        );
    }

  }

  update(): void {
    if(this.createUserForm.valid && !this.createUserForm.pending) {
      var userCommand = this.createUserForm.getRawValue() as UpdateUserCommand;
      userCommand.id = this.userId;

      this.userService.update(userCommand)
        .subscribe(
          result => {
            this.processFeedback("Usuário editado com sucesso!", "success");
            setTimeout(() => {
              this.router.navigate(['']);
            }, 2500);
          },
          failure => {
            this.processFeedback("Ops! ocorreu um erro ao tentar cadastrar o usuário", "danger");
          }
        );
    }
  }

  processFeedback(message: string, colorMessage: string, hasMessage: boolean = true): void {
    this.feedbackMessage = message;
    this.hasMessage = hasMessage;
    this.colorContentMessage = colorMessage;
  }

}
