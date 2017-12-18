import { ProtobufMessage } from '../../grpc';
import { User, Token } from '../models/types_pb';

export class ValidateUserRequest extends ProtobufMessage {
  getUsername(): string;
  setUsername(username: string);

  getPassword(): string;
  setPassword(password: string);
}

export class ValidateUserReply extends ProtobufMessage {
  getValid(): boolean;

  getUser(): User;
  hasUser(): boolean;
}

export class GetUserInfoRequest extends ProtobufMessage {
  getUsername(): string;
  setUsername(username: string);
}

export class GetUserInfoReply extends ProtobufMessage {
  getExists(): boolean;
  getUser(): User;
  hasUser(): boolean;
}

export class GetTokenInfoRequest extends ProtobufMessage {
  getToken(): string;
  setToken(token: string);
}

export class GetTokenInfoReply extends ProtobufMessage {
  getExists(): boolean;
  getToken(): Token;
  hasToken(): boolean;
}