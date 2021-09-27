import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { PagedUtils } from '../utils/pagedUtils';
import { CreateUserCommand } from '../commands/create-user.command';
import { CreatedUser } from '../responses/created.user';
import { UserSingleResponse } from '../responses/user-single.response';
import { UpdateUserCommand } from '../commands/update-user.command';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    public readonly url = `${environment.baseApiUrl}/api/users`;

    constructor(private httpClient: HttpClient) {}

    get(page: number, itemsPerPage: number): Observable<PagedUtils<User>> {
        return this.httpClient.get<PagedUtils<User>>(
            `${this.url}?page=${page}&per_page=${itemsPerPage}`
        );
    }

    getById(id: number): Observable<UserSingleResponse> {
        return this.httpClient.get<UserSingleResponse>(
            `${this.url}/${id}`
        );
    }

    create(command: CreateUserCommand): Observable<CreatedUser> {
        return this.httpClient.post<CreatedUser>(
            `${this.url}`, 
            command
        );
    }

    update(commad: UpdateUserCommand): Observable<CreatedUser> {
        return this.httpClient.put<CreatedUser>(
            `${this.url}/${commad.id}`, 
            commad
        );
    }

}