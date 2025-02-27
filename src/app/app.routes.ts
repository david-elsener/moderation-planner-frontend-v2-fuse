import { Route } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { initialDataResolver } from 'app/app.resolvers';
import { LayoutComponent } from 'app/layout/layout.component';
import { ModeratorsComponent } from './modules/moderation/moderators/moderators.component';
import { ModerationTracksComponent } from './modules/moderation/moderation-tracks/moderation-tracks.component';
import { CalendarViewComponent } from './modules/moderation/calendar-view/calendar-view.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect /auth/code to '/quick-actions'
    { path: 'auth/code', pathMatch: 'full', redirectTo: 'calendar' },

    // Protected routes
    {
        path: '',
        canActivate: [MsalGuard],
        canActivateChild: [MsalGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver,
        },
        children: [
            {
                path: 'sign-out',
                loadChildren: () =>
                    import('app/modules/auth/sign-out/sign-out.routes'),
            },
            { path: 'moderators', component: ModeratorsComponent},
            { path: 'moderation-tracks', component: ModerationTracksComponent},
            { path: 'calendar', component: CalendarViewComponent},
            { path: '', pathMatch: 'full', redirectTo: 'calendar' },
        ],
    },

];
