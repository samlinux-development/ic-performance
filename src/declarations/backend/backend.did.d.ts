import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface storedMessage {
  'msg' : string,
  'seconds' : bigint,
  'timestamp' : bigint,
}
export interface _SERVICE {
  'getAllMessages' : ActorMethod<[], Array<[bigint, storedMessage]>>,
  'getCountTest' : ActorMethod<[], bigint>,
  'getLastMessage' : ActorMethod<[], string>,
  'getLastMessageFromMap' : ActorMethod<[], [] | [storedMessage]>,
  'storeMessage' : ActorMethod<[string], string>,
  'storeMessageWithTime' : ActorMethod<[string, bigint, bigint], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
