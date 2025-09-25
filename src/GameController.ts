import * as readline from 'readline';
import { LemonadeStand } from './LemonadeStand.js';
import { Supplies, SupplyPrices } from './types.js';

export class GameController {
    private lemonadeStand: LemonadeStand;
    private rl: readline.Interface;

    constructor() {
        this.lemonadeStand = new LemonadeStand();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    // Start the game
    async startGame(): Promise<void> {
        console.log("Welcome to the Lemonade Stand Simulation Game!");
        console.log("You have $20 starting capital.");
        console.log("Goal: Make money by selling lemonade!");
        console.log("=====================================\n");

        await this.gameLoop();
    }

    // Main game loop
    private async gameLoop(): Promise<void> {
        while (true) {
            console.log(`\nDay ${this.lemonadeStand.getGameStatus()}`);
            console.log(`Weather: ${this.lemonadeStand.getWeatherInfo()}`);
            
            // Display current recipe
            const recipe = this.lemonadeStand.getRecipe();
            console.log(`Current recipe: Each cup needs ${recipe.cupsPerServing} cups, ${recipe.icePerServing} ice, ${recipe.lemonsPerServing} lemons, ${recipe.sugarPerServing} sugar`);
            console.log(`Price: $${recipe.pricePerCup.toFixed(2)} per cup\n`);

            // Generate daily prices
            const dailyPrices = this.lemonadeStand.generateDailyPrices();
            this.displayPrices(dailyPrices);

            // Ask if want to change recipe
            const wantToChangeRecipe = await this.askYesNo("Do you want to change the recipe? (y/n): ");
            if (wantToChangeRecipe) {
                await this.changeRecipe();
            }

            // Buy supplies
            await this.buySuppliesPhase(dailyPrices);

            // Simulate sales
            const salesResult = this.lemonadeStand.simulateDaySales();
            this.displaySalesResult(salesResult);

            // Check game over conditions
            if (this.lemonadeStand.getCash() <= 0) {
                console.log("\nYou ran out of cash! Game over!");
                break;
            }

            // Ask if continue
            const continueGame = await this.askYesNo("\nContinue to next day? (y/n): ");
            if (!continueGame) {
                console.log("Thanks for playing!");
                break;
            }

            this.lemonadeStand.startNewDay();
        }

        this.rl.close();
    }

    // Display prices
    private displayPrices(prices: SupplyPrices): void {
        console.log("Today's supply prices:");
        console.log(`   Cups: $${prices.cups.toFixed(3)} each`);
        console.log(`   Ice: $${prices.ice.toFixed(3)} each`);
        console.log(`   Lemons: $${prices.lemons.toFixed(3)} each`);
        console.log(`   Sugar: $${prices.sugar.toFixed(3)} each\n`);
    }

    // Change recipe
    private async changeRecipe(): Promise<void> {
        console.log("\nChange recipe:");
        
        const cupsPerServing = await this.askNumber("How many cups per serving? (current: 1): ", 1);
        const icePerServing = await this.askNumber("How many ice per serving? (current: 2): ", 2);
        const lemonsPerServing = await this.askNumber("How many lemons per serving? (current: 1): ", 1);
        const sugarPerServing = await this.askNumber("How many sugar per serving? (current: 1): ", 1);
        const pricePerCup = await this.askNumber("Price per cup? (current: $0.25): ", 0.25);

        this.lemonadeStand.updateRecipe({
            cupsPerServing,
            icePerServing,
            lemonsPerServing,
            sugarPerServing,
            pricePerCup
        });

        console.log("Recipe updated!");
    }

    // Buy supplies phase
    private async buySuppliesPhase(prices: SupplyPrices): Promise<void> {
        console.log(`You have $${this.lemonadeStand.getCash().toFixed(2)}`);
        console.log(this.lemonadeStand.getInventoryStatus());
        
        const cups = await this.askNumber("How many cups to buy?: ", 0);
        const ice = await this.askNumber("How many ice to buy?: ", 0);
        const lemons = await this.askNumber("How many lemons to buy?: ", 0);
        const sugar = await this.askNumber("How many sugar to buy?: ", 0);

        const supplies: Supplies = { cups, ice, lemons, sugar };
        
        // Calculate total cost
        const totalCost = 
            supplies.cups * prices.cups +
            supplies.ice * prices.ice +
            supplies.lemons * prices.lemons +
            supplies.sugar * prices.sugar;

        console.log(`Total cost: $${totalCost.toFixed(2)}`);

        if (totalCost > this.lemonadeStand.getCash()) {
            console.log("Insufficient cash!");
            return;
        }

        const success = this.lemonadeStand.buySupplies(supplies, prices);
        if (success) {
            console.log("Purchase successful!");
            console.log(this.lemonadeStand.getInventoryStatus());
        } else {
            console.log("Purchase failed!");
        }
    }

    // Display sales result
    private displaySalesResult(salesResult: any): void {
        console.log("\nToday's sales result:");
        console.log(`Cups sold: ${salesResult.cupsSold}`);
        console.log(`Revenue: $${salesResult.revenue.toFixed(2)}`);
        console.log(`Supplies used: Cups ${salesResult.suppliesUsed.cups}, Ice ${salesResult.suppliesUsed.ice}, Lemons ${salesResult.suppliesUsed.lemons}, Sugar ${salesResult.suppliesUsed.sugar}`);
        console.log(`Current cash: $${this.lemonadeStand.getCash().toFixed(2)}`);
    }

    // Ask yes/no question
    private askYesNo(question: string): Promise<boolean> {
        return new Promise((resolve) => {
            this.rl.question(question, (answer) => {
                resolve(answer.toLowerCase().startsWith('y'));
            });
        });
    }

    // Ask number question
    private askNumber(question: string, defaultValue: number): Promise<number> {
        return new Promise((resolve) => {
            this.rl.question(question, (answer) => {
                const num = parseFloat(answer);
                resolve(isNaN(num) ? defaultValue : num);
            });
        });
    }
}