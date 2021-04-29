import { Component, OnInit } from '@angular/core';
import {GameService} from '../service/game.service';
import {Game} from '../model/interface/game';
import {Router} from '@angular/router';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  constructor(private router: Router, public gameService: GameService) { }

  ngOnInit(): void {
  }
  // Toutes les fonctions "on" sont exécutées suite au clique d'une icone dans le menu
  // Après avoir testé si il y a des blocks disponibles
  // On va signifier au gameservice que clique a été fait.
  onCircus(): void{
    if (this.gameService.game.circusAvailable > 0){
      this.gameService.circusClicked = !this.gameService.circusClicked;
    }
  }
  onFountain(): void{
    if (this.gameService.game.fountainAvailable > 0) {
      this.gameService.fountainClicked = !this.gameService.fountainClicked;
    }
  }
  onHouse(): void{
    if(this.gameService.game.houseAvailable > 0) {
      this.gameService.houseClicked = !this.gameService.houseClicked;
    }
  }
  onWindTurbine(): void{
    if (this.gameService.game.windTurbineAvailable > 0) {
      this.gameService.windTurbineClicked = !this.gameService.windTurbineClicked;
    }
  }
  // Si on clique sur terminer la partie avant la fin le score va être mit dans la back et on va aller sur la fenêtre de fin
  onClickedEnd(): void{
    this.router.navigate(['endgame']);
  }
}
