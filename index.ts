import express from 'express';
import axios from 'axios';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { configDotenv } from 'dotenv';

// inicializa env variables
configDotenv();

// mongo connection url
const mongoURI = "mongodb+srv://pocinterviewuser:3yNa9NWR1YK1EYz4@poc-mongo-cluster.umch7tw.mongodb.net/?retryWrites=true&w=majority";

// setup mongo client
const client = new MongoClient(mongoURI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

// setup express
const app = express();
app.use(express.json());


/**
 * POST /inscripcion
 * Permite inscribir a un alumno a un curso y guardarlo en la base de datos
 * 
 * @param {Request} body:
 * {
 *  "curso": "string",
 *  "email": "string",
 *  "nombre": "string",
 *  "apellido": "string",
 *  "dni": "string",
 *  "telefono": "string"
 * }
 * 
 * @returns Response body:
 * {
 *  ...request.body,
 * "inscripcion_id": "string"
 * }
 */
app.post('/inscripcion', async (req, res) => {
    try {
        const inscripciones  = req.body
        const result: any[] = []

        await client.connect();
        await client.db("poc-mongo-cluster").command({ ping: 1 });

        for (const inscripcion of inscripciones) {
            const { curso, email } = inscripcion;

            const response = await axios.post('https://enroll-course-thirdparty.vercel.app/api/courses/enroll', {
                curso,
                email
            })
            
            const { curso_enroll_id } = response.data.data
            inscripcion.inscripcion_id = curso_enroll_id
        }

        await client.db("poc-mongo-cluster").collection("enrollments").insertMany(inscripciones);

        res.status(200).json({
            message: "Enroll created successfully",
            data: inscripciones
        })
    } catch (error) {
        await client.close();

        res.status(500).json({
            message: "Error creating enroll",
            data: error
        })
    }
});

const port = process.env.SERVER_PORT || 3005;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});