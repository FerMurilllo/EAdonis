
import { Schema, model} from 'mongoose';

interface Partida {
    _id: number;
    user : Object;
    nombre: string;
  }
  
  export default class PartidaModel{

  static schema = new Schema<Partida>({
    _id: { type: Number, required: true },
    user: { type: Object , required: false },
    nombre: { type: String, required: true }
  });

  static PartidaModel1 = model<Partida>('Partida', this.schema);

}