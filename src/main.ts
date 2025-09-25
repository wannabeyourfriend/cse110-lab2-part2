import { GameController } from './GameController.js';

async function main() {
    const gameController = new GameController();
    await gameController.startGame();
}

main().catch(console.error);