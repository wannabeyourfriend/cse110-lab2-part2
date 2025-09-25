// Weather type enum
export enum WeatherType {
    COLD = "cold",
    COOL = "cool",
    WARM = "warm",
    HOT = "hot"
}

// Supply types
export interface Supplies {
    cups: number;
    ice: number;
    lemons: number;
    sugar: number;
}

// Supply prices
export interface SupplyPrices {
    cups: number;
    ice: number;
    lemons: number;
    sugar: number;
}

// Lemonade recipe
export interface Recipe {
    cupsPerServing: number;
    icePerServing: number;
    lemonsPerServing: number;
    sugarPerServing: number;
    pricePerCup: number;
}

// Daily sales result
export interface DailySales {
    cupsSold: number;
    revenue: number;
    suppliesUsed: Supplies;
}