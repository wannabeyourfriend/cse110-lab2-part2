import { Inventory } from './Inventory.js';
import { Weather } from './Weather.js';
import { Supplies, SupplyPrices, Recipe, DailySales } from './types.js';

export class LemonadeStand {
    private inventory: Inventory;
    private weather: Weather;
    private cash: number;
    private day: number;
    private recipe: Recipe;

    constructor(startingCash: number = 20) {
        this.inventory = new Inventory();
        this.weather = new Weather();
        this.cash = startingCash;
        this.day = 1;
        this.recipe = {
            cupsPerServing: 1,
            icePerServing: 2,
            lemonsPerServing: 1,
            sugarPerServing: 1,
            pricePerCup: 0.25
        };
    }

    // Get current cash
    getCash(): number {
        return this.cash;
    }

    // Get current day
    getDay(): number {
        return this.day;
    }

    // Get current recipe
    getRecipe(): Recipe {
        return { ...this.recipe };
    }

    // Update recipe
    updateRecipe(newRecipe: Partial<Recipe>): void {
        this.recipe = { ...this.recipe, ...newRecipe };
    }

    // Get current inventory status
    getInventoryStatus(): string {
        return this.inventory.getInventoryStatus();
    }

    // Get current weather info
    getWeatherInfo(): string {
        return this.weather.getWeatherDescription();
    }

    // Generate daily supply prices (with some randomness)
    generateDailyPrices(): SupplyPrices {
        return {
            cups: Math.round((0.02 + Math.random() * 0.01) * 100) / 100, // $0.02-0.03
            ice: Math.round((0.01 + Math.random() * 0.005) * 100) / 100, // $0.01-0.015
            lemons: Math.round((0.03 + Math.random() * 0.02) * 100) / 100, // $0.03-0.05
            sugar: Math.round((0.02 + Math.random() * 0.01) * 100) / 100  // $0.02-0.03
        };
    }

    // Buy supplies
    buySupplies(supplies: Supplies, prices: SupplyPrices): boolean {
        const totalCost = 
            supplies.cups * prices.cups +
            supplies.ice * prices.ice +
            supplies.lemons * prices.lemons +
            supplies.sugar * prices.sugar;

        if (totalCost > this.cash) {
            return false; // Insufficient cash
        }

        this.cash -= totalCost;
        this.inventory.addSupplies(supplies);
        return true;
    }

    // Simulate a day's sales
    simulateDaySales(): DailySales {
        const weatherMultiplier = this.weather.getSalesMultiplier();
        
        // Base demand (10-30 cups, adjusted by weather)
        const baseDemand = Math.floor(10 + Math.random() * 20);
        const adjustedDemand = Math.floor(baseDemand * weatherMultiplier);

        // Calculate supplies needed per cup
        const suppliesPerCup: Supplies = {
            cups: this.recipe.cupsPerServing,
            ice: this.recipe.icePerServing,
            lemons: this.recipe.lemonsPerServing,
            sugar: this.recipe.sugarPerServing
        };

        // Check how many cups can actually be made
        const actualCupsSold = this.inventory.canMakeLemonade(adjustedDemand, suppliesPerCup);

        // Use supplies
        const totalSuppliesUsed: Supplies = {
            cups: actualCupsSold * suppliesPerCup.cups,
            ice: actualCupsSold * suppliesPerCup.ice,
            lemons: actualCupsSold * suppliesPerCup.lemons,
            sugar: actualCupsSold * suppliesPerCup.sugar
        };

        this.inventory.useSupplies(totalSuppliesUsed);

        // Calculate revenue
        const revenue = actualCupsSold * this.recipe.pricePerCup;
        this.cash += revenue;

        return {
            cupsSold: actualCupsSold,
            revenue: revenue,
            suppliesUsed: totalSuppliesUsed
        };
    }

    // Start new day
    startNewDay(): void {
        this.day++;
        this.weather.generateNewDayWeather();
    }

    // Get game status summary
    getGameStatus(): string {
        return `${this.day} | Cash: $${this.cash.toFixed(2)} | ${this.getInventoryStatus()}`;
    }
}