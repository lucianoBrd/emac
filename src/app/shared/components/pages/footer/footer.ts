import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

import { TapToTop } from '../../tap-to-top/tap-to-top';
import {Copyright} from "../copyright/copyright";

@Component({
  selector: 'app-footer',
  imports: [Copyright, TapToTop],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'],
})
export class Footer {

}
