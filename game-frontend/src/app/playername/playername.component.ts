import { Component, OnInit } from '@angular/core';
import {GameService} from '../service/game.service';
import {OverlayService} from '../service/overlay.service';
import {NgForm} from '@angular/forms';
import {ChangeNamePlayer} from '../model/impl/change-name-player';

@Component({
  selector: 'app-playername',
  templateUrl: './playername.component.html',
  styleUrls: ['./playername.component.css']
})
export class PlayernameComponent implements OnInit {

  constructor(public gameService: GameService, public overlay: OverlayService) { }

  ngOnInit(): void {
  }
  onQuit(): void{
    this.overlay.dispose();
  }
  onChangeName(form: NgForm): void{
    this.gameService.changeName.name = form.value.name;
    this.gameService.changeName.do();
  }
  onUndo(): void {
    this.gameService.changeName.undo();
  }
  onRedo(): void {
    this.gameService.changeName.redo();
  }
}
