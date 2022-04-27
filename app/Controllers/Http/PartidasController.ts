 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import mongoose, {connect} from 'mongoose';
 import Partida from 'App/Models/Partida'
import   BarcoModel from 'Database/migrations/barco';
import { Request } from '@adonisjs/core/build/standalone';
 'Database/migrations/barco';

 const url = 'mongodb://localhost:27017/barco';
 const Barco = BarcoModel.BarcoModel1; 


export default class PartidasController {

    async insertar({ request, response }) {
        try {
            await connect(url);
            const com = new Barco({
              id : request.input('Barco'), 
              idPartida : request.input('Partida'), 
              Posicion : request.input('Posicion')
            })
            await com.save()
            response.status(200).json({
              message: 'Successfully created a new model.',
              data: com
            })
          } catch (error) {
            response.status(400).json({
              message : "Failing created a new model."
            })
          }
      }
      /*
    public async update({request,params, response}: HttpContextContract) {
      console.log("update"); 
      try{
        await connect(url);
       console.log(params.id); 

        const com = await Estrella.findByIdAndUpdate(params.id, 
        {
          Estrella : request.input("Estrella")
        })
        
        response.status(200).json({
          massage : "Satifactorio. Usuario encontrado y actualizado.",
          data : com
        })
      }
      catch(error){
        response.status(400).json({
          massage : "Error. Usuario no enocntrado.",
        })
      }
    }
   */
      public async update({params, request, response }: HttpContextContract){
          try{
              await connect(url);       
              const barco = await Barco.findByIdAndUpdate(params.id,
                {
                Posicion: request.input("Posicion")
                })  

                response.status(200).json({
                    massage : "Succesfully.",
                    data : barco
                  })
        }
        catch(error){
          response.status(400).json({
            massage : "Error.",
          })
        }
      }
      
      public async show({params, response}: HttpContextContract) {
        console.log("show"); 
        try{
          await connect(url);
          console.log(params.id);
          const numero = parseInt( params.id);  
          const com = await Barco.aggregate([
            {
              '$match': {
                'id': numero
              }
            }, {
              '$group': {
                '_id': '$idPartida', 
                'Posicion': {
                  
                }
              }
            }, {
              '$project': {
                '_id': 0
              }
            }
          ]);
          console.log(params.id); 
    
          response.status(200).json({
            massage : "Satifactorio. Usuario encontrado",
            data : com
          })
        }
        catch(error){
          response.status(400).json({
            massage : "Error. Usuario no enocntrado.",
          })
        }
      }
    
   
    

}
