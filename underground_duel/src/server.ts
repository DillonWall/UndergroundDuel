import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import path from "path"
import { parseTilemapFile } from "./server/tilemap_parser.js"
import { ServerSettings } from "./server/server_settings.js"
import { TilemapModel } from "./models/tilemap/tilemap_model.js"

const app = express()
const httpServer = createServer(app)

const io = new Server(httpServer)

async function main() {
	const tilemapModel: TilemapModel = await parseTilemapFile(
		path.join(ServerSettings.tilemapPath, "TestingTerrains.tmj")
	)

	io.on("connection", (socket) => {
		console.log("Client connected")

		socket.on("disconnect", () => {
			console.log("Client disconnected")
		})

		socket.emit("map", tilemapModel)
	})

	app.use(express.static("public"))

	httpServer.listen(3000, () => {
		console.log("Server is running on port 3000")
	})
}

main()
