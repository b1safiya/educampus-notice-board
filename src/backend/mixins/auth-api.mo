import AuthLib "../lib/auth";
import AuthTypes "../types/auth";
import List "mo:core/List";

mixin (users : List.List<AuthTypes.User>) {

  /// Register a new user account.
  public func register(req : AuthTypes.RegisterRequest) : async AuthTypes.RegisterResult {
    AuthLib.register(users, req);
  };

  /// Login with username and password. Returns role on success.
  public func login(req : AuthTypes.LoginRequest) : async AuthTypes.LoginResult {
    AuthLib.login(users, req);
  };
};
