import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-browser';
import { User } from 'app/core/user/user.types';
import { Observable, ReplaySubject, map, of } from 'rxjs';
import { getEnvironment } from '../../../environment/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    private _httpClient = inject(HttpClient);
    private msalService = inject(MsalService);
    private domSanitizer = inject(DomSanitizer);
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User) {
        // Store the value
        this._user.next(value);
    }

    get user$(): Observable<User> {
        return this._user.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current signed-in user data
     */
    get(): Observable<User> {
        console.log('fetching user from Azure AD ...');
        if (this.msalService.instance.getAllAccounts().length > 0) {
            const account = this.msalService.instance.getAllAccounts()[0];
            console.log('logged in user: ' + account.username + account.name);
            const user = this.mapAzureAccountToUser(account);
            this._user.next(user);
            this.updateAccountPhoto(user);
            return of(user);
        }
    }

    private mapAzureAccountToUser(account: AccountInfo): User {
        return {
            id: account.username,
            name: account.name,
            email: account.username,
            status: 'online',
        };
    }

    private updateAccountPhoto(user: User) {
        this.fetchAccountPhoto().subscribe((photo) => {
            user.avatar = this.domSanitizer.bypassSecurityTrustUrl(
                URL.createObjectURL(photo)
            );
            this._user.next(user);
        });
    }

    private fetchAccountPhoto(): Observable<Blob> {
        console.log('fetching profile photo from Azure Ad');
        return this._httpClient.get(
            getEnvironment().oAuthGraphEndpoint + '/me/photo/$value',
            {
                responseType: 'blob',
                headers: new HttpHeaders({ 'Content-Type': 'image/jpeg' }),
            }
        );
    }

    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any> {
        return this._httpClient.patch<User>('api/common/user', { user }).pipe(
            map((response) => {
                this._user.next(response);
            })
        );
    }
}
