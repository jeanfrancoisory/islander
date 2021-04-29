import {Score} from '../interface/score';
import {Player} from '../interface/player';

export class ScoreImpl implements Score{
  private _player: Player;
  private _score: number;

  constructor() {
  }

  get player(): Player {
    return this._player;
  }

  set player(value: Player) {
    this._player = value;
  }

  get score(): number {
    return this._score;
  }

  set score(value: number) {
    this._score = value;
  }
}
