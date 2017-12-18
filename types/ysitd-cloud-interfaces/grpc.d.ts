import { Message } from 'google-protobuf';

declare class ProtobufMessage extends Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): {};
}
