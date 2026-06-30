
import { Component } from "@angular/core";

@Component({
  selector: "app-event-schedule",
  imports: [],
  templateUrl: "./event-schedule.html",
  styleUrls: ["./event-schedule.scss"],
})
export class EventSchedule {
  schedule = [
    {
      name: "Vicky Smith",
      totime: "08:00",
      endtime: "10:00",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of.",
      icon: "assets/images/event/icon.png",
    },
    {
      name: "Sam Rowling",
      totime: "08:00",
      endtime: "10:00",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of.",
      icon: "assets/images/event/icon.png",
    },
    {
      name: "Vicky Smith",
      totime: "08:00",
      endtime: "10:00",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of.",
      icon: "assets/images/event/icon.png",
    },
    {
      name: "Sam Rowling",
      totime: "08:00",
      endtime: "10:00",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of.",
      icon: "assets/images/event/icon.png",
    },
  ];
}
