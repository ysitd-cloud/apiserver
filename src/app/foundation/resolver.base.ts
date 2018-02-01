import { Observable } from 'rxjs';

export class ResolverBase {
  protected wrap(source: Observable<any>): Promise<any> {
    return new Promise<any>(((resolve, reject) => {
      const subscription = source.subscribe(resolve, reject, () => subscription.unsubscribe());
    }));
  }
}