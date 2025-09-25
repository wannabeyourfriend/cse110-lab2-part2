// 天气类型枚举
export enum WeatherType {
    COLD = "cold",
    COOL = "cool",
    WARM = "warm",
    HOT = "hot"
}

// 供应品类型
export interface Supplies {
    cups: number;
    ice: number;
    lemons: number;
    sugar: number;
}

// 供应品价格
export interface SupplyPrices {
    cups: number;
    ice: number;
    lemons: number;
    sugar: number;
}

// 柠檬水配方
export interface Recipe {
    cupsPerServing: number;
    icePerServing: number;
    lemonsPerServing: number;
    sugarPerServing: number;
    pricePerCup: number;
}

// 每日销售结果
export interface DailySales {
    cupsSold: number;
    revenue: number;
    suppliesUsed: Supplies;
}