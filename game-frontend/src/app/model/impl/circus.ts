import {Block} from '../interface/block';

export class Circus implements Block{
  clicked: boolean;

  constructor() {
    this.clicked = false;
  }
}
