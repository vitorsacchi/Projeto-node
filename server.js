import { fastify } from "fastify";
import{ DatabaseMemory } from './databse-memory-.js'
import { title } from "process";

const server = fastify()
const database = new DatabaseMemory()

server.post('/videos', (request,reply) => {
    const { title,descripition, duration} = request.body

    database.create({
        title,
        descripition,
        duration,
    })
        

    return reply.status(201).send()
}) 

    server.get("/videos", (request) => {
        const search = request.query.search

        console.log(search)

        const videos = database.list(search)

        console.log(videos)

        return videos
    }) 

    server.put("/videos/:id",(request,reply) => {
        const videoId = request.params.id
        const { title,descripition, duration} = request.body

        database.update(videoId, {
            title,
            descripition,
            duration,
        })

        return reply.status(204).send()
    }) 

    server.delete("/videos/:id",(request, reply) => {
        const videoId = request.params.id

        database.delete(videoId)

        return reply.status(204).send()
    }) 

    server.listen({
        port: 3000,
    }) 