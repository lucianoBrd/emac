import { Component } from '@angular/core';
import {ConfigDB} from "../../shared/data/config";

@Component({
  selector: 'app-emac-contact',
  templateUrl: './emac-contact.html',
  styleUrls: ['./emac-contact.scss'],
})
export class EmacContact {
  public wording = ConfigDB.wordings.emac.contact;
}
