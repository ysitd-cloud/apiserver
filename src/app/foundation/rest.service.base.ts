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
    return this.config.get(this.hostnameKey);
  }
}