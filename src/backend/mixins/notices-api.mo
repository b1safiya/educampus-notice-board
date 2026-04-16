import NoticesLib "../lib/notices";
import NoticesTypes "../types/notices";
import AuthTypes "../types/auth";
import List "mo:core/List";

mixin (
  notices : List.List<NoticesTypes.Notice>,
  users : List.List<AuthTypes.User>,
) {

  var _nextNoticeId : Nat = notices.size();

  /// Create a new notice. Requires admin authentication via username parameter.
  public shared ({ caller }) func createNotice(req : NoticesTypes.CreateNoticeRequest, adminUsername : Text) : async NoticesTypes.NoticeResult {
    switch (users.find(func(u : AuthTypes.User) : Bool { u.username == adminUsername and u.role == #admin })) {
      case null { #err("Unauthorized: admin access required") };
      case (?_) {
        let id = _nextNoticeId;
        _nextNoticeId += 1;
        let notice = NoticesLib.createNotice(notices, id, req, adminUsername);
        #ok(notice);
      };
    };
  };

  /// Get all notices. Accessible by all users.
  public query func getAllNotices() : async [NoticesTypes.Notice] {
    NoticesLib.getAllNotices(notices);
  };

  /// Get a single notice by ID.
  public query func getNoticeById(id : Nat) : async ?NoticesTypes.Notice {
    NoticesLib.getNoticeById(notices, id);
  };

  /// Update an existing notice. Requires admin authentication via username parameter.
  public shared ({ caller }) func updateNotice(req : NoticesTypes.UpdateNoticeRequest, adminUsername : Text) : async NoticesTypes.NoticeResult {
    switch (users.find(func(u : AuthTypes.User) : Bool { u.username == adminUsername and u.role == #admin })) {
      case null { #err("Unauthorized: admin access required") };
      case (?_) {
        NoticesLib.updateNotice(notices, req);
      };
    };
  };

  /// Delete a notice by ID. Requires admin authentication via username parameter.
  public shared ({ caller }) func deleteNotice(id : Nat, adminUsername : Text) : async NoticesTypes.DeleteResult {
    switch (users.find(func(u : AuthTypes.User) : Bool { u.username == adminUsername and u.role == #admin })) {
      case null { #err("Unauthorized: admin access required") };
      case (?_) {
        NoticesLib.deleteNotice(notices, id);
      };
    };
  };
};
