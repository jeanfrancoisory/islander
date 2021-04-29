import { Component, OnInit } from '@angular/core';
import {Game} from '../model/interface/game';
import {GameService} from '../service/game.service';
import {Router} from '@angular/router';
import {GameImpl} from '../model/impl/game-impl';

@Component({
  selector: 'app-endgame',
  templateUrl: './endgame.component.html',
  styleUrls: ['./endgame.component.css']
})
export class EndgameComponent implements OnInit {

  constructor(private router: Router, public gameService: GameService) {
  }

  ngOnInit(): void{
  }

  // Si on clique sur le bouton rejouer on va au menu
  onClickedReplay(): void{
    this.gameService.game = new GameImpl(this.router);
    this.router.navigate(['menu']);
  }

  // On enregiste le score dans le back
  onClickedSave(): void {
    this.gameService.putScore();
  }

}
