import { ProtobufMessage } from '../../grpc';
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';

export class User extends ProtobufMessage {
  getUsername(): string;
  setUsername(value: string);

  getDisplayName(): string;
  setDisplayName(value: string);

  getEmail(): string;
  setEmail(value: string);

  getAvatarUrl(): string;
  setAvatarUrl(value: string);
}

export class Service extends ProtobufMessage {
  getId(): string;
  setId(value: string);
}

export class Token extends ProtobufMessage {
  getIssuer(): User;
  setIssuer(issuer: User);
  clearIssuer(): void;
  hasIssuer(): boolean;

  getAudience(): Service;
  setAudience(audience: Service);
  clearAudience(): void;
  hasAudience(): boolean;

  getExpire(): Timestamp;
  setExpire(expire: Timestamp);
  clearExpire(): void;
  hasExpire(): boolean;

  getScopesList(): string[];
  setScopesList(list: string[]);
  addScopes(scope: string, index: number);
  clearScopesList(): void;
}