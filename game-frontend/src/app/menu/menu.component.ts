import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Player} from '../model/interface/player';
import {GameService} from '../service/game.service';
import {NgForm} from '@angular/forms';
import {Map} from '../model/interface/map';
import {Grass} from '../model/impl/grass';
import {Tree} from '../model/impl/tree';
import {Water} from '../model/impl/water';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private _namesMaps: string[];
  private _mapName: string;

  constructor(private router: Router, private gameService: GameService) { }

  ngOnInit(): void {
    // On récupère le nom des cartes pour les afficher
    this._namesMaps = this.gameService.names;
  }

  onStartGame(form: NgForm): void{
    // On récupère le nom du joueur et la carte choisie
    // this.gameService.game.player.name = form.value.name;
    this.mapName = form.value.carte;
    // Appel à la fonction qui récupère la carte
    this.gameService.getMapPlayed(this.mapName).then(returnedData => {
      this.gameService.mapPlayed = (returnedData as Map);
      this.gameService.mapPlayed.tileList.forEach(tile => {
          if (!tile.type.localeCompare('Grass')){
            this.gameService.game.map.tileList.push(new Grass());
          }
          if (!tile.type.localeCompare('Tree')){
            this.gameService.game.map.tileList.push(new Tree());
          }
          if (!tile.type.localeCompare('Water')){
            this.gameService.game.map.tileList.push(new Water());
          }
        }
      );
      this.gameService.game.map.name = this.gameService.mapPlayed.name;
      // Calcul de nombre d'herbe sur la carte pour l'utilisé dans l'eventualité d'une fin de game
      this.gameService.game.nbGrass = this.gameService.game.map.tileList.filter(tile => !tile.type.localeCompare('grass')).length;
    });
    // On navige vers la carte
    this.router.navigate(['map']);
  }

  get mapName(): string {
    return this._mapName;
  }

  set mapName(value: string) {
    this._mapName = value;
  }

  get namesMaps(): string[] {
    return this._namesMaps;
  }

  set namesMaps(value: string[]) {
    this._namesMaps = value;
  }
}
