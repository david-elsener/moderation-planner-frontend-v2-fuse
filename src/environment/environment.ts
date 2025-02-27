export const environmentDev: EnvConfig = {
    env: 'dev',
    displayName: 'Development',
    oAuthAuthority:
        'https://login.microsoftonline.com/2598639a-d083-492d-bdbe-f1dd8066b03a',
    oAuthClientId: '8aede2ef-4bb9-45b4-b4a3-affb465be048',
    oAuthDefaultScopes: ['8aede2ef-4bb9-45b4-b4a3-affb465be048/.default'],
    oAuthRedirectUri: '/auth/code',
    oAuthGraphEndpoint: 'https://graph.microsoft.com/v1.0',
    oAuthGraphEndpointScopes: ['user.read'],
    backend: {
        url: 'http://localhost:8080',
        //url: 'https://fileid-backend.inte-test.media.int:443',
        apiPath: '/api/v1',
        headers: new Map<string, string>([
            ['x-apikey', 'rXKGOaXFuiEzsNEWsdi5PsDCKvAiQWHB'],
        ]),
    },
};

export const environmentTest: EnvConfig = {
    env: 'test',
    displayName: 'Test',
    oAuthAuthority:
        'https://login.microsoftonline.com/2598639a-d083-492d-bdbe-f1dd8066b03a',
    oAuthClientId: '8aede2ef-4bb9-45b4-b4a3-affb465be048',
    oAuthDefaultScopes: ['8aede2ef-4bb9-45b4-b4a3-affb465be048/.default'],
    oAuthRedirectUri: '/auth/code',
    oAuthGraphEndpoint: 'https://graph.microsoft.com/v1.0',
    oAuthGraphEndpointScopes: ['user.read'],
    backend: {
        url: 'https://fileid-backend.inte-test.media.int:443',
        apiPath: '/api/v1',
        headers: new Map<string, string>(),
    },
};

export const environmentProd: EnvConfig = {
    env: 'prod',
    displayName: 'Production',
    oAuthAuthority:
        'https://login.microsoftonline.com/2598639a-d083-492d-bdbe-f1dd8066b03a',
    oAuthClientId: '964dbe94-fa4b-4bd9-b214-680d6f4916c0',
    oAuthDefaultScopes: ['964dbe94-fa4b-4bd9-b214-680d6f4916c0/.default'],
    oAuthRedirectUri: '/auth/code',
    oAuthGraphEndpoint: 'https://graph.microsoft.com/v1.0',
    oAuthGraphEndpointScopes: ['user.read'],
    backend: {
        url: 'https://fileid-backend.inte.media.int:443',
        apiPath: '/api/v1',
        headers: new Map<string, string>(),
    },
};

export const environmentsByHost = new Map<string, EnvConfig>([
    ['localhost:4200', environmentDev],
    ['fileid.inte-test.media.int', environmentTest],
    ['fileid.inte.media.int', environmentProd],
]);

export function getEnvironment(): EnvConfig {
    for (const entry of environmentsByHost.entries()) {
        if (entry[0].includes(window.location.host)) {
            return entry[1];
        }
    }
    return environmentsByHost.entries().next().value;
}

export interface EnvConfig {
    env: string;
    displayName: string;
    oAuthClientId: string;
    oAuthDefaultScopes: string[];
    oAuthAuthority: string;
    oAuthRedirectUri: string;
    oAuthGraphEndpoint: string;
    oAuthGraphEndpointScopes: string[];
    backend: {
        url: string;
        apiPath: string;
        headers: Map<string, string>;
    };
}
