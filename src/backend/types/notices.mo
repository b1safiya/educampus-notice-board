import Common "common";

module {
  public type NoticeId = Common.NoticeId;
  public type Timestamp = Common.Timestamp;
  public type Category = Common.Category;

  public type Notice = {
    id : NoticeId;
    title : Text;
    category : Category;
    description : Text;
    fileUrl : Text;
    date : Text;
    createdBy : Text;
    createdAt : Timestamp;
  };

  public type CreateNoticeRequest = {
    title : Text;
    category : Category;
    description : Text;
    fileUrl : Text;
    date : Text;
  };

  public type UpdateNoticeRequest = {
    id : NoticeId;
    title : Text;
    category : Category;
    description : Text;
    fileUrl : Text;
    date : Text;
  };

  public type NoticeResult = {
    #ok : Notice;
    #err : Text;
  };

  public type DeleteResult = {
    #ok;
    #err : Text;
  };
};
