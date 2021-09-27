import { CreateUserCommand } from './create-user.command';

export interface UpdateUserCommand extends CreateUserCommand {
    id: number;
}