import { Component, OnInit } from '@angular/core';
import {GameService} from '../service/game.service';

@Component({
  selector: 'app-topscore',
  templateUrl: './topscore.component.html',
  styleUrls: ['./topscore.component.css']
})
export class TopscoreComponent implements OnInit {

  constructor(public gameService: GameService) { }

  ngOnInit(): void {
  }

}
