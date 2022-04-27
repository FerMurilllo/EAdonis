import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import mongoose, {connect} from 'mongoose';
 import Partida from 'App/Models/Partida'
import   BarcoModel from 'App/Models/barco';
import { Request } from '@adonisjs/core/build/standalone';
 'Database/migrations/barco';

 const url = 'mongodb://localhost:27017/barco';
 const Barco = BarcoModel.BarcoModel1; 


export default class BarcoController {

 
  public async store({ request, response }) {
    try {
        await connect(url);
        const com = new Barco({
          idUser : request.input('NoPartida'), 
          monitor : request.input('Monitor'), 
        })
        await com.save()
        response.status(200).json({
          message: 'Successfully .',
          data: com
        })
      } catch (error) {
        response.status(400).json({
          message : "Error."
        })
      }
  }

  public async update({auth,request,params, response}: HttpContextContract) {
    try{
      await connect(url);
      const user = await auth.use('api').authenticate()
     console.log(params.id); 

      const parti = await Barco.findByIdAndUpdate(params.id, 
      {
        
        user: user.serializeAttributes(),
        monitor : request.input('Monitor') ,
        jugando:request.input('Jugando'),

      })
      
      response.status(200).json({
        massage : "Satifactorio.",
        data : parti
      })
    }
    catch(error){
      response.status(400).json({
        massage : "Error.",
      })
    }
  }



   

}
