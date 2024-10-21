import Nat "mo:base/Nat";
import Text "mo:base/Text";

import Map "mo:map/Map";
import { nhash } "mo:map/Map";

actor {
  stable var lastMessage : Text = "";
  stable var lastMessageId : Nat = 0;
  type storedMessage = {
    msg: Text;
    seconds: Nat;
  };

  stable let storedMessages = Map.new<Nat, storedMessage>();

	public shared func storeMessage(message : Text) : async Text {
    lastMessage := message;
    lastMessage;
  };

  public shared func storeMessageWithTime(msg:Text, seconds:Nat) : async () {
    let msgArchiv:storedMessage = {msg = msg; seconds = seconds};

    lastMessageId += 1;      
    Map.set(storedMessages, nhash, lastMessageId, msgArchiv);
  };

  public shared query func getLastMessage() : async Text {
    lastMessage;
  };

  public shared query func getCountTest() : async Nat {
    Map.size(storedMessages);
  };

  // getAllMessages from the map
  public shared query func getAllMessages() : async [(Nat, storedMessage)] {
    Map.toArray(storedMessages);
  };
 

};