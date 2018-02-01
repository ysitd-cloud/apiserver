import {ConfigService} from './config/config.service';
import { HttpService } from './http/http.service';

export class RestServiceBase {
  constructor(
    protected readonly config: ConfigService,
    protected readonly http: HttpService,
    private readonly hostnameKey: string,
    private readonly path: string,
  ) {}

  protected getBasePath() {
    const hostname = this.getHostname();
    return `${hostname}${this.path}`;
  }

  private getHostname(): string {
    const hostname = this.config.get(this.hostnameKey);
    if (hostname.startsWith('http')) {
      return hostname;
    }

    return `http://${hostname}`;
  }
}