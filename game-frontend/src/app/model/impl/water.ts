import {Tile} from '../interface/tile';

export class Water implements Tile{
  private _type: string;
  private _isOccipued: boolean;

  constructor() {
    this._type = 'water';
    this._isOccipued = false;
  }

  get isOccipued(): boolean {
    return this._isOccipued;
  }

  set isOccipued(value: boolean) {
    this._isOccipued = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }


}
