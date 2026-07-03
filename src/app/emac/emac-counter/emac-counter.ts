import { Component } from "@angular/core";

import { Counter } from "../../shared/models/emac/counter.interface";
import { CounterService } from "../../shared/service/emac/counter.service";

@Component({
  selector: "app-emac-counter",
  templateUrl: "./emac-counter.html",
  styleUrls: ["./emac-counter.scss"],
})
export class EmacCounter {
  public counters: Counter[];

  constructor(private counterService: CounterService) {
    this.counters = this.counterService.getCounters();
  }
}
