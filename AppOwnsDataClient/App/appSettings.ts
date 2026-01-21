export default class AppSettings {

  // replace with production URL after deploying Web API
  public static apiRoot: string = "https://localhost:44302/api/"; 

  // setting for Azure AD app which supports SPA authentication
  public static tenant: string = "f325857e-a2a1-4724-802a-37e74d5c60cc";
  public static clientId: string = "c2229113-a9e3-4e48-9af8-ec4074dc5aca";
 
  // permission scopes required with App-Owns-Data Web API
  public static apiScopes: string[] = [
    "api://" + AppSettings.clientId + "/Reports.Embed"
  ];

}