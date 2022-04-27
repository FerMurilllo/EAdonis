 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import  {connect} from 'mongoose';
 
 import PartidaModel from 'App/Models/Partida';
 'Database/migrations/barco';

 const url = 'mongodb://localhost:27017/barco';
 const Partida =PartidaModel.PartidaModel1;

export default class PartidasController {

    
  public async index({ response }: HttpContextContract) {
    console.log("index"); 

      try{
        await connect(url);
        const com = await Partida.find({}); 
  
        response.status(200).json({
          message: 'Successfully .',
          data: com
        })
      }
      catch(error){
        response.status(404).json({
          message : "Failing."
        })
      }
      
    }

    public async store({ request, response }) {
        try {
            await connect(url);
            const com = new Partida({
              _id : request.input('NoPartida'), 
              nombre : request.input('Nombre'), 
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

          const parti = await Partida.findByIdAndUpdate(params.id, 
          {
            nombre : request.input("nombre"),
            user: user.serializeAttributes(),
            
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
