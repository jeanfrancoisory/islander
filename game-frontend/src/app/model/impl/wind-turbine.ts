import {Block} from '../interface/block';

export class WindTurbine implements Block{
  clicked: boolean;

  constructor() {
    this.clicked = false;
  }

}
