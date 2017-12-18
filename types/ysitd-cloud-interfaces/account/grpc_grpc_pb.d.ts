import { Client, ClientUnaryCall, Metadata, CallOptions, ServiceError } from 'grpc';
import {
  ValidateUserRequest,
  ValidateUserReply,
  GetUserInfoRequest,
  GetUserInfoReply,
  GetTokenInfoRequest,
  GetTokenInfoReply,
} from './actions/account_pb'


type Callback<T> = (error: ServiceError | null, value: T) => void

export class AccountClient extends Client {
  validateUserPassword(
    argument: ValidateUserRequest | null,
    metadata: Metadata | null,
    options: CallOptions | null,
    callback: Callback<ValidateUserReply>,
  ): ClientUnaryCall;

  getUserInfo(
    argument: GetUserInfoRequest | null,
    metadata: Metadata | null,
    options: CallOptions | null,
    callback: Callback<GetUserInfoReply>,
  ): ClientUnaryCall;

  getTokenInfo(
    argument: GetTokenInfoRequest | null,
    metadata: Metadata | null,
    options: CallOptions | null,
    callback: Callback<GetTokenInfoReply>,
  ): ClientUnaryCall;
}