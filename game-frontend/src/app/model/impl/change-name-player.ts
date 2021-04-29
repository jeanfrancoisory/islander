import {Undoable} from '../interface/undoable';
import {Commande} from '../interface/commande';
import {GameService} from '../../service/game.service';

export class ChangeNamePlayer implements Undoable, Commande{

  previousName: string;
  undoClicked: boolean;
  private _name: string;

  constructor(public gameService: GameService) {
    this.previousName = '';
    this.undoClicked = false;
    this._name = '';
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  do(): void {
    this.previousName = this.gameService.game.player.name;
    this.undoClicked = false;
    this.gameService.game.player.name = this.name;
  }

  redo(): void {
    if (this.undoClicked){
      const tmp = this.gameService.game.player.name;
      this.gameService.game.player.name = this.previousName;
      this.previousName = tmp;
      this.undoClicked = false;
    }
  }

  undo(): void {
    if (!this.undoClicked && !(this.previousName === '')){
      const tmp = this.gameService.game.player.name;
      this.gameService.game.player.name = this.previousName;
      this.previousName = tmp;
      this.undoClicked = true;
    }
  }
}
