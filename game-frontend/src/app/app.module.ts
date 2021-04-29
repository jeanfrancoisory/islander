import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MapComponent} from './map/map.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatBadgeModule} from '@angular/material/badge';
import {OverlayModule} from '@angular/cdk/overlay';
import {MatListModule} from '@angular/material/list';
import { MenuComponent } from './menu/menu.component';
import {FormsModule} from '@angular/forms';
import { ScoreComponent } from './score/score.component';
import { EndgameComponent } from './endgame/endgame.component';
import { TopscoreComponent } from './topscore/topscore.component';
import { PlayernameComponent } from './playername/playername.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MenuComponent,
    ScoreComponent,
    EndgameComponent,
    TopscoreComponent,
    PlayernameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatBadgeModule,
    OverlayModule,
    MatListModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
