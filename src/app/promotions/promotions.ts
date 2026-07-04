import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

import { Breadcrumb } from '../shared/components/pages/breadcrumb/breadcrumb';
import { Footer } from '../shared/components/pages/footer/footer';
import { Header } from '../shared/components/pages/header/header';
import {Nav} from "../shared/components/pages/nav/nav";
import {ConfigDB} from "../shared/data/config";

@Component({
  selector: 'app-promotions',
  imports: [Header, Breadcrumb, RouterOutlet, Footer, NgClass, Nav],
  templateUrl: './promotions.html',
  styleUrls: ['./promotions.scss'],
})
export class Promotions {
  public wordings = ConfigDB.wordings.emac.header;
}
