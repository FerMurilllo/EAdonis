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
          const com = await Barco.aggregate([{
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
          // console.log(com[0].monitor)
          if(com[0].monitor == request.input("monitor")){
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

    async empezar({ request, response }) {
      try {
        // await b1.save()
          await connect(url);
          // const  b1 = await Barco.updateOne({monitor:request.input("monitor_viejo")}, {jugando:true})
          const  b1 = await Barco.updateOne({monitor:request.input("monitor")}, {jugando:true})
          const com = await Barco.aggregate([{
            $sort: {
                monitor: 1
            }
          }])

          // console.log(com[0].monitor)
          // if(com[0].monitor == request.input("monitor")){
           let respuesta=com
          // }
          response.status(200).json({
            message: 'Juego iniciado.',
            data: respuesta
          })
        } catch (error) {
          console.log(error)
          response.status(400).json({
            message : "Failing created a new model."
          })
        }
    }
    async cambiarPantalla({ request, response }) {
      try {
        // await b1.save()
          await connect(url);
          // const  b1 = await Barco.updateOne({monitor:request.input("monitor_viejo")}, {jugando:true})
          const  b1 = await Barco.updateOne({monitor:request.input("monitor_viejo")}, {jugando:false})
          const  b2 = await Barco.updateOne({monitor:request.input("monitor_nuevo")}, {jugando:true})

          response.status(200).json({
            message: 'pantalla cambiada.',
            // data: respuesta
          })
        } catch (error) {
          console.log(error)
          response.status(400).json({
            message : "Failing created a new model."
          })
        }
    }

    async getEstado({ request, response }) {
      try {
        // await b1.save()
          await connect(url);
          // const  b1 = await Barco.updateOne({monitor:request.input("monitor_viejo")}, {jugando:true})
          const  b1 = await Barco.find({monitor:request.input("monitor")})
          // const  b2 = await Barco.updateOne({monitor:request.input("monitor_nuevo")}, {jugando:true})

          response.status(200).json({
            message: 'pantalla cambiada.',
            data: b1
          })
        } catch (error) {
          console.log(error)
          response.status(400).json({
            message : "Failing created a new model."
          })
        }
    }



}
