import { lerp } from "./lerp.js"

// Contains an X and a Y describing a vector. Used for points, indecies, velocity, etc
export class Vector2D {
	public x: number
	public y: number

	constructor(x: number, y: number) {
		this.x = x
		this.y = y
	}

	public static fromString(str: string): Vector2D {
		const parsed = str.replace(new RegExp(/\(|\)/, "g"), "").split(",")
		const x = Number(parsed[0])
		const y = Number(parsed[1])

		if (isNaN(x) || isNaN(y)) {
			throw new Error(`Cannot instantiate Vector2D from string ${str}`)
		}

		return new Vector2D(x, y)
	}

	public toString(): string {
		return `(${this.x},${this.y})`
	}

	public static lerp(start: Vector2D, end: Vector2D, t: number): Vector2D {
		return new Vector2D(lerp(start.x, end.x, t), lerp(start.y, end.y, t))
	}

	public static add(a: Vector2D, b: Vector2D): Vector2D {
		return new Vector2D(a.x + b.x, a.y + b.y)
	}

	public static subtract(a: Vector2D, b: Vector2D): Vector2D {
		return new Vector2D(a.x - b.x, a.y - b.y)
	}
}
