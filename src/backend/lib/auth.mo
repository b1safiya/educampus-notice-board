import Types "../types/auth";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public type User = Types.User;
  public type RegisterRequest = Types.RegisterRequest;
  public type LoginRequest = Types.LoginRequest;
  public type LoginResult = Types.LoginResult;
  public type RegisterResult = Types.RegisterResult;

  /// Hash a password using a simple deterministic djb2-style accumulator over character codes.
  public func hashPassword(password : Text) : Text {
    var hash : Nat = 5381;
    for (c in password.toIter()) {
      // Char to Nat32 is a Motoko built-in primitive
      let code = Nat32.toNat(Char.toNat32(c));
      hash := (hash * 33 + code) % 4294967296;
    };
    hash.toText();
  };

  /// Check if a username exists in the user list.
  public func userExists(users : List.List<User>, username : Text) : Bool {
    switch (users.find(func(u : User) : Bool { u.username == username })) {
      case (?_) true;
      case null false;
    };
  };

  /// Register a new user. Returns #err if username already taken.
  public func register(users : List.List<User>, req : RegisterRequest) : RegisterResult {
    if (userExists(users, req.username)) {
      return #err("Username already taken");
    };
    let user : User = {
      username = req.username;
      var passwordHash = hashPassword(req.password);
      var role = req.role;
      createdAt = Time.now();
    };
    users.add(user);
    #ok;
  };

  /// Authenticate a user by username and password.
  public func login(users : List.List<User>, req : LoginRequest) : LoginResult {
    switch (users.find(func(u : User) : Bool { u.username == req.username })) {
      case (?user) {
        if (user.passwordHash == hashPassword(req.password)) {
          #ok({ username = user.username; role = user.role });
        } else {
          #err("Invalid password");
        };
      };
      case null {
        #err("User not found");
      };
    };
  };

  /// Seed default admin and student accounts if they don't already exist.
  public func seedDefaultUsers(users : List.List<User>) {
    if (not userExists(users, "admin")) {
      let adminUser : User = {
        username = "admin";
        var passwordHash = hashPassword("admin123");
        var role : Types.Role = #admin;
        createdAt = Time.now();
      };
      users.add(adminUser);
    };
    if (not userExists(users, "student")) {
      let studentUser : User = {
        username = "student";
        var passwordHash = hashPassword("student123");
        var role : Types.Role = #student;
        createdAt = Time.now();
      };
      users.add(studentUser);
    };
  };
};
