// === Azure IDs ===
export const TenantId = "f325857e-a2a1-4724-802a-37e74d5c60cc";
export const ClientId = "c2229113-a9e3-4e48-9af8-ec4074dc5aca";   // SPA frontend
export const WebApiAppId = "39f0b991-f2f1-49c3-90b9-b2091dd188c4"; // Web API backend

// === MSAL config ===
export const msalConfig = {
    auth: {
        clientId: ClientId,
        authority: `https://login.microsoftonline.com/${TenantId}`,
        redirectUri: "/"
    }
};

// === MSAL scopes (THIS FIXES LOGIN) ===
export const userPermissionScopes = [
    `api://${WebApiAppId}/Reports.Embed`
];

export const PowerBiLoginRequest = {
    scopes: userPermissionScopes
};
