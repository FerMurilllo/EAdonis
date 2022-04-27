
import { Schema, model} from 'mongoose';
interface Barco {
    idUser:number;
    monitor : number;
    jugando: boolean;
  }
  
  export default class BarcoModel{

  static schemaB = new Schema<Barco>({
    idUser: {type: Number, required: true},
    monitor: {type:Number, required:true},
    jugando: {type:Boolean, required:true}
  });

  static BarcoModel1 = model<Barco>('Barco', this.schemaB);

}
