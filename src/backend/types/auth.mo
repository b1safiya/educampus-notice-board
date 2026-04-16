import Common "common";

module {
  public type Role = Common.Role;
  public type Timestamp = Common.Timestamp;

  public type User = {
    username : Text;
    var passwordHash : Text;
    var role : Role;
    createdAt : Timestamp;
  };

  public type RegisterRequest = {
    username : Text;
    password : Text;
    role : Role;
  };

  public type LoginRequest = {
    username : Text;
    password : Text;
  };

  public type LoginResult = {
    #ok : { username : Text; role : Role };
    #err : Text;
  };

  public type RegisterResult = {
    #ok;
    #err : Text;
  };
};
