import { KeycloakService } from "keycloak-angular";
import { from } from "rxjs";
import { switchMap } from "rxjs/operators";
import { ConfigInitService } from "../init/config-init.service";

export function initializeKeycloak(
  keycloak: KeycloakService,
  configService: ConfigInitService
  ) {
    return () =>
      configService.getConfig()
        .pipe(
          switchMap<any, any>((config) => {

            return from(keycloak.init({
              config: {
                url: config['KEYCLOAK_URL'],
                realm: config['KEYCLOAK_REALM'],
                clientId: config['KEYCLOAK_CLIENT_ID'],
              },
              initOptions: {
                checkLoginIframe: false,
                onLoad: "check-sso"
              }
            }))
              
          })
        ).toPromise()
}