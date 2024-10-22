import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Debug "mo:base/Debug";

import Map "mo:map/Map";
import { nhash } "mo:map/Map";

actor {
  stable var lastMessage : Text = "";
  stable var lastMessageId : Nat = 0;
  type storedMessageOld = {
    msg: Text;
    seconds: Nat;
  };
  type storedMessage = {
    msg: Text;
    seconds: Nat;
    timestamp: Nat;
  };

  stable let storedMessages = Map.new<Nat, storedMessageOld>();
  
  // upgrade procedure
  // - Step 1 - first upgrade step
  // -- create new map storedMessagesNew
  // -- fill data from old map storedMessages to new map storedMessagesNew
  // -- replace old map storedMessages with new map storedMessagesNew
  // Step 2 - second upgrade step
  // - remove old map storedMessages from stable storage
  // - remove transformation code from upgrade procedure ???

  // fill data from old map storedMessages to new map storedMessagesNew
  stable let storedMessagesNew = Map.new<Nat, storedMessage>();

  // Initialize storedMessagesNew with transformed values from storedMessages
  for ((key, value) in Map.entries(storedMessages)) {
    let newValue: storedMessage = { msg = value.msg; seconds = value.seconds; timestamp = 0 };
    Map.set(storedMessagesNew, nhash, key, newValue);
  };

	public shared func storeMessage(message : Text) : async Text {
    lastMessage := message;
    lastMessage;
  };

  public shared func storeMessageWithTime(msg:Text, seconds:Nat, timestamp:Nat) : async () {
    let msgArchiv:storedMessage = {msg = msg; seconds = seconds; timestamp = timestamp};
    Debug.print(debug_show(msgArchiv) );

    lastMessageId += 1;      
    Map.set(storedMessagesNew, nhash, lastMessageId, msgArchiv);
  };

  public shared query func getLastMessage() : async Text {
    lastMessage;
  };

  public shared query func getCountTest() : async Nat {
    Map.size(storedMessagesNew);
  };

  // getAllMessages from the map
  public shared query func getAllMessages() : async [(Nat, storedMessage)] {
    Map.toArray(storedMessagesNew);
  };

};