import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapComponent} from './map/map.component';
import {MenuComponent} from './menu/menu.component';
import {EndgameComponent} from './endgame/endgame.component';

const routes: Routes = [
  { path: 'menu', component: MenuComponent },
  { path: 'map', component: MapComponent},
  { path: 'endgame', component: EndgameComponent},
  // L'application s'ouvre sur le menu de démarage
  { path: '',
    redirectTo: '/menu',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
