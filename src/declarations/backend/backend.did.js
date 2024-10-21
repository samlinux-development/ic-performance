export const idlFactory = ({ IDL }) => {
  const storedMessage = IDL.Record({ 'msg' : IDL.Text, 'seconds' : IDL.Nat });
  return IDL.Service({
    'getAllMessages' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Nat, storedMessage))],
        ['query'],
      ),
    'getCountTest' : IDL.Func([], [IDL.Nat], ['query']),
    'getLastMessage' : IDL.Func([], [IDL.Text], ['query']),
    'storeMessage' : IDL.Func([IDL.Text], [IDL.Text], []),
    'storeMessageWithTime' : IDL.Func([IDL.Text, IDL.Nat], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
