import Types "../types/notices";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  public type Notice = Types.Notice;
  public type CreateNoticeRequest = Types.CreateNoticeRequest;
  public type UpdateNoticeRequest = Types.UpdateNoticeRequest;
  public type NoticeResult = Types.NoticeResult;
  public type DeleteResult = Types.DeleteResult;

  /// Create a new notice and add it to the list.
  public func createNotice(
    notices : List.List<Notice>,
    nextId : Nat,
    req : CreateNoticeRequest,
    createdBy : Text,
  ) : Notice {
    let notice : Notice = {
      id = nextId;
      title = req.title;
      category = req.category;
      description = req.description;
      fileUrl = req.fileUrl;
      date = req.date;
      createdBy = createdBy;
      createdAt = Time.now();
    };
    notices.add(notice);
    notice;
  };

  /// Get all notices as an array.
  public func getAllNotices(notices : List.List<Notice>) : [Notice] {
    notices.toArray();
  };

  /// Get a single notice by ID.
  public func getNoticeById(notices : List.List<Notice>, id : Nat) : ?Notice {
    notices.find(func(n : Notice) : Bool { n.id == id });
  };

  /// Update an existing notice. Returns #err if not found.
  public func updateNotice(notices : List.List<Notice>, req : UpdateNoticeRequest) : NoticeResult {
    var found = false;
    notices.mapInPlace(
      func(n : Notice) : Notice {
        if (n.id == req.id) {
          found := true;
          {
            n with
            title = req.title;
            category = req.category;
            description = req.description;
            fileUrl = req.fileUrl;
            date = req.date;
          };
        } else {
          n;
        };
      }
    );
    if (found) {
      switch (getNoticeById(notices, req.id)) {
        case (?updated) #ok(updated);
        case null #err("Notice not found after update");
      };
    } else {
      #err("Notice not found");
    };
  };

  /// Delete a notice by ID. Returns #err if not found.
  public func deleteNotice(notices : List.List<Notice>, id : Nat) : DeleteResult {
    let sizeBefore = notices.size();
    let filtered = notices.filter(func(n : Notice) : Bool { n.id != id });
    if (filtered.size() == sizeBefore) {
      return #err("Notice not found");
    };
    notices.clear();
    notices.append(filtered);
    #ok;
  };

  /// Seed the list with sample notices across all categories.
  public func seedSampleNotices(notices : List.List<Notice>, startId : Nat) : Nat {
    let samples : [(Types.Category, Text, Text, Text, Text)] = [
      // Academic notices
      (#academic, "Final Exam Schedule Released", "The final examination schedule for all departments has been published. Students can download the timetable from the academic portal.", "https://example.com/exam-schedule.pdf", "2026-04-20"),
      (#academic, "Scholarship Applications Open", "Applications for merit-based scholarships are now open. Eligible students must submit their applications by May 15, 2026.", "https://example.com/scholarship-form.pdf", "2026-04-18"),
      (#academic, "New Curriculum 2026-27 Announced", "The updated curriculum for the academic year 2026-27 has been approved by the board. View the changes in the attached document.", "https://example.com/curriculum-2026.pdf", "2026-04-15"),
      // Event notices
      (#event, "Annual Cultural Festival", "Join us for the Annual Cultural Festival on May 5-7, 2026. Register your team for competitions in music, dance, drama, and more.", "https://example.com/festival-details.pdf", "2026-05-05"),
      (#event, "Inter-College Hackathon 2026", "EduCampus is hosting a 24-hour hackathon on May 10, 2026. Teams of 2-4 students can register online. Exciting prizes await!", "https://example.com/hackathon-register.pdf", "2026-05-10"),
      (#event, "Annual Sports Day Celebration", "Annual Sports Day will be held on April 28, 2026. All students are encouraged to participate in field and track events.", "https://example.com/sports-day.pdf", "2026-04-28"),
      // Sports notices
      (#sports, "Inter-Department Cricket Tournament", "The inter-department cricket tournament begins April 22, 2026. Register your department team before April 19. Fixtures will be announced shortly.", "https://example.com/cricket-fixtures.pdf", "2026-04-22"),
      (#sports, "Swimming Competition – Open Registration", "The annual swimming competition is scheduled for May 3, 2026. All skill levels are welcome. Prizes for top 3 in each category.", "https://example.com/swimming-comp.pdf", "2026-05-03"),
      (#sports, "Morning Yoga Camp Starting Soon", "A free 30-day morning yoga camp will begin May 1, 2026 at 6:00 AM on the university grounds. Open to all students and staff.", "https://example.com/yoga-camp.pdf", "2026-05-01"),
      // General notices
      (#general, "Library Extended Hours During Exams", "The university library will remain open until midnight from April 25 to May 20, 2026 to support students during exam preparation.", "https://example.com/library-hours.pdf", "2026-04-25"),
      (#general, "Campus Wi-Fi Maintenance Notice", "Campus-wide Wi-Fi will undergo scheduled maintenance on April 19, 2026 from 2:00 AM to 6:00 AM. Plan accordingly.", "https://example.com/wifi-notice.pdf", "2026-04-19"),
      (#general, "New Parking Regulations Effective May 1", "Updated parking regulations will be enforced starting May 1, 2026. All vehicles must display a valid permit. See details for zone assignments.", "https://example.com/parking-rules.pdf", "2026-05-01"),
    ];
    var id = startId;
    for ((cat, title, desc, url, date) in samples.values()) {
      notices.add({
        id;
        title;
        category = cat;
        description = desc;
        fileUrl = url;
        date;
        createdBy = "admin";
        createdAt = Time.now();
      });
      id += 1;
    };
    id;
  };
};
