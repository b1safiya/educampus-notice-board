import AuthTypes "types/auth";
import NoticesTypes "types/notices";
import AuthLib "lib/auth";
import NoticesLib "lib/notices";
import AuthMixin "mixins/auth-api";
import NoticesMixin "mixins/notices-api";
import List "mo:core/List";

actor {
  let users = List.empty<AuthTypes.User>();
  let notices = List.empty<NoticesTypes.Notice>();

  // Seed default users and sample notices on first run
  AuthLib.seedDefaultUsers(users);
  ignore NoticesLib.seedSampleNotices(notices, 0);

  include AuthMixin(users);
  include NoticesMixin(notices, users);
};
