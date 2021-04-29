import {Player} from '../interface/player';

export class PlayerImpl implements Player{
  private _namePlayer: string;

  constructor() {
    this._namePlayer = this.makeString();
  }

  get name(): string {
    return this._namePlayer;
  }

  set name(value: string) {
    this._namePlayer = value;
  }

  makeString(): string {
    let outString = '';
    const inOptions = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 7; i++) {

      outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));

    }

    return outString;
  }
}
