 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import mongoose, {connect} from 'mongoose';
 import partida from 'App/Models/partida'
// import   BarcoModel from 'Database/migrations/barco';
import { Request } from '@adonisjs/core/build/standalone';
 'Database/migrations/barco';


 const url = 'mongodb://localhost:27017/barco';
 const Barco = partida.AutoModel;


export default class PartidasController {

    async insertar({ auth, request, response }) {
      try {
        const user = await auth.use('api').authenticate()
          await connect(url);
          const com = new Barco({
            user: user,
            monitor: request.input("monitor"),
            jugando: false
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


    async verificar1ero({ request, response }) {
      try {
          await connect(url);
          const com = await Barco.agreggate([{
            $sort: {
                monitor: 1
            }
          }, {
              $limit: 1
          }])
          let respuesta = {
            message: 'tu no eres el primero.',
            data: false
          }
          if(com.monitor == request.input("monitor")){
            respuesta= {
              message: 'tu SI eres el primero.',
              data: true
            }
          }
          response.status(200).json(respuesta)
        } catch (error) {
          console.log(error)
          response.status(400).json({
            message : "Failing created a new model."
          })
        }
    }



}
