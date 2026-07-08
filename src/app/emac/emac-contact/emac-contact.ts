import { Component } from '@angular/core';
import {ConfigDB} from "../../shared/data/config";

@Component({
  selector: 'app-emac-contact',
  templateUrl: './emac-contact.html',
  styleUrls: ['./emac-contact.scss'],
})
export class EmacContact {
  public wordings = ConfigDB.wordings.emac.contact;
}
