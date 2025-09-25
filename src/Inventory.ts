import { Supplies } from './types.js';

export class Inventory {
    private supplies: Supplies;

    constructor() {
        this.supplies = {
            cups: 0,
            ice: 0,
            lemons: 0,
            sugar: 0
        };
    }

    // Get current supplies
    getCurrentSupplies(): Supplies {
        return { ...this.supplies };
    }

    // Add supplies
    addSupplies(newSupplies: Supplies): void {
        this.supplies.cups += newSupplies.cups;
        this.supplies.ice += newSupplies.ice;
        this.supplies.lemons += newSupplies.lemons;
        this.supplies.sugar += newSupplies.sugar;
    }

    // Use supplies (when making lemonade)
    useSupplies(usedSupplies: Supplies): boolean {
        // Check if there are enough supplies
        if (this.supplies.cups < usedSupplies.cups ||
            this.supplies.ice < usedSupplies.ice ||
            this.supplies.lemons < usedSupplies.lemons ||
            this.supplies.sugar < usedSupplies.sugar) {
            return false; // Insufficient supplies
        }

        // Deduct used supplies
        this.supplies.cups -= usedSupplies.cups;
        this.supplies.ice -= usedSupplies.ice;
        this.supplies.lemons -= usedSupplies.lemons;
        this.supplies.sugar -= usedSupplies.sugar;

        return true; // Successfully used
    }

    // Check if can make specified amount of lemonade
    canMakeLemonade(cupsToMake: number, suppliesPerCup: Supplies): number {
        const maxCupsByCups = Math.floor(this.supplies.cups / suppliesPerCup.cups);
        const maxCupsByIce = Math.floor(this.supplies.ice / suppliesPerCup.ice);
        const maxCupsByLemons = Math.floor(this.supplies.lemons / suppliesPerCup.lemons);
        const maxCupsBySugar = Math.floor(this.supplies.sugar / suppliesPerCup.sugar);

        const maxPossibleCups = Math.min(maxCupsByCups, maxCupsByIce, maxCupsByLemons, maxCupsBySugar);
        return Math.min(cupsToMake, maxPossibleCups);
    }

    // Get inventory status string
    getInventoryStatus(): string {
        return `Inventory: Cups ${this.supplies.cups}, Ice ${this.supplies.ice}, Lemons ${this.supplies.lemons}, Sugar ${this.supplies.sugar}`;
    }
}