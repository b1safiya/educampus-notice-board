module {
  public type Timestamp = Int;
  public type NoticeId = Nat;

  public type Role = {
    #admin;
    #student;
  };

  public type Category = {
    #academic;
    #event;
    #sports;
    #general;
  };
};
