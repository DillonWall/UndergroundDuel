import { Entity } from "../utils/ecs/entity.js";
export class Game extends Entity {
    // private readonly _stateMachina = new GameStateMachina(this)
    get entities() {
        return this._entities;
    }
    constructor() {
        super();
        this._lastTimestamp = 0;
    }
    Awake() {
        // this.addComponent(new GameInputComponent())
        // this.addComponent(new StartGameUI(document.body))
        super.awake();
        // awake all children
        for (const entity of this._entities) {
            entity.awake();
        }
        // this.InitStateMachina()
        // Make sure Update starts after all entities are awaken
        window.requestAnimationFrame(() => {
            // set initial timestamp
            this._lastTimestamp = Date.now();
            // start update loop
            this.update();
        });
    }
    // public InitStateMachina(): void {
    // 	const stateStart = new GameStateStart(this._stateMachina)
    // 	const stateTeamA = new GameStateTeamA(this._stateMachina)
    // 	const stateTeamB = new GameStateTeamB(this._stateMachina)
    // 	const stateOver = new GameStateOver(this._stateMachina)
    // 	this._stateMachina.SetStates([stateStart, stateTeamA, stateTeamB, stateOver], stateStart)
    // 	this._stateMachina.Start()
    // }
    update() {
        const deltaTime = (Date.now() - this._lastTimestamp) / 1000;
        // update all components
        super.update(deltaTime);
        // update all children
        for (const entity of this._entities) {
            entity.update(deltaTime);
        }
        // this._stateMachina.update(deltaTime)
        // update the timestamp
        this._lastTimestamp = Date.now();
        // Invoke on next frame
        window.requestAnimationFrame(() => this.update());
    }
}
//# sourceMappingURL=game.js.map