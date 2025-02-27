import {
    MsalGuardConfiguration,
    MsalInterceptorConfiguration,
} from '@azure/msal-angular';
import {
    BrowserCacheLocation,
    IPublicClientApplication,
    InteractionType,
    LogLevel,
    PublicClientApplication,
} from '@azure/msal-browser';
import { getEnvironment } from '../environment/environment';

// Code was taken from https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/samples/msal-angular-v3-samples/angular18-standalone-sample
// and adopted to our needs (e.g. custom environment)

export function loggerCallback(logLevel: LogLevel, message: string) {
    console.log(message);
}

export function MSALInstanceFactory(): IPublicClientApplication {
    return new PublicClientApplication({
        auth: {
            clientId: getEnvironment().oAuthClientId,
            authority: getEnvironment().oAuthAuthority,
            redirectUri: '/auth/code',
            postLogoutRedirectUri: '/',
        },
        cache: {
            cacheLocation: BrowserCacheLocation.LocalStorage,
        },
        system: {
            allowNativeBroker: false, // Disables WAM Broker
            loggerOptions: {
                loggerCallback,
                logLevel: LogLevel.Info,
                piiLoggingEnabled: false,
            },
        },
    });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
    const protectedResourceMap = new Map<string, Array<string>>();
    protectedResourceMap.set(
        getEnvironment().backend.url,
        getEnvironment().oAuthDefaultScopes
    );
    protectedResourceMap.set(
        getEnvironment().oAuthGraphEndpoint,
        getEnvironment().oAuthGraphEndpointScopes
    );
    return {
        interactionType: InteractionType.Redirect,
        protectedResourceMap,
    };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
    return {
        interactionType: InteractionType.Redirect,
        authRequest: {
            scopes: getEnvironment().oAuthDefaultScopes,
        },
        loginFailedRoute: '/login-failed',
    };
}
