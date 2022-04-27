import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';
import { Schema, model} from 'mongoose';

interface IntAuto {
  _id: string;
  id: string;
  // id: number;
  nombre: string;
  user: Object; 
}

export default class AutoModel extends BaseModel{
  @column({ isPrimary: true })
  public id: number

  @column()
  public username :string

  @column()
  public status: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  static autoSchema = new Schema<IntAuto>({
    // id: { type: Number, required: false },
    _id: { type: String, required: true },
    // id: { type: String, required: true },
    nombre: { type: String, required: false },
    user: { type:Object , required: false },
                   //listo
    
  });
  static AutoModel: any = model<IntAuto>('autos', this.autoSchema);

}
