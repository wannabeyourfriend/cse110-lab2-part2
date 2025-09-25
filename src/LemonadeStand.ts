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

    // 获取当前现金
    getCash(): number {
        return this.cash;
    }

    // 获取当前天数
    getDay(): number {
        return this.day;
    }

    // 获取当前配方
    getRecipe(): Recipe {
        return { ...this.recipe };
    }

    // 更新配方
    updateRecipe(newRecipe: Partial<Recipe>): void {
        this.recipe = { ...this.recipe, ...newRecipe };
    }

    // 获取当前库存状态
    getInventoryStatus(): string {
        return this.inventory.getInventoryStatus();
    }

    // 获取当前天气信息
    getWeatherInfo(): string {
        return this.weather.getWeatherDescription();
    }

    // 生成每日供应品价格（有一定随机性）
    generateDailyPrices(): SupplyPrices {
        return {
            cups: Math.round((0.02 + Math.random() * 0.01) * 100) / 100, // $0.02-0.03
            ice: Math.round((0.01 + Math.random() * 0.005) * 100) / 100, // $0.01-0.015
            lemons: Math.round((0.03 + Math.random() * 0.02) * 100) / 100, // $0.03-0.05
            sugar: Math.round((0.02 + Math.random() * 0.01) * 100) / 100  // $0.02-0.03
        };
    }

    // 购买供应品
    buySupplies(supplies: Supplies, prices: SupplyPrices): boolean {
        const totalCost = 
            supplies.cups * prices.cups +
            supplies.ice * prices.ice +
            supplies.lemons * prices.lemons +
            supplies.sugar * prices.sugar;

        if (totalCost > this.cash) {
            return false; // 现金不足
        }

        this.cash -= totalCost;
        this.inventory.addSupplies(supplies);
        return true;
    }

    // 模拟一天的销售
    simulateDaySales(): DailySales {
        const weatherMultiplier = this.weather.getSalesMultiplier();
        
        // 基础需求（10-30杯，根据天气调整）
        const baseDemand = Math.floor(10 + Math.random() * 20);
        const adjustedDemand = Math.floor(baseDemand * weatherMultiplier);

        // 计算每杯需要的供应品
        const suppliesPerCup: Supplies = {
            cups: this.recipe.cupsPerServing,
            ice: this.recipe.icePerServing,
            lemons: this.recipe.lemonsPerServing,
            sugar: this.recipe.sugarPerServing
        };

        // 检查实际能制作多少杯
        const actualCupsSold = this.inventory.canMakeLemonade(adjustedDemand, suppliesPerCup);

        // 使用供应品
        const totalSuppliesUsed: Supplies = {
            cups: actualCupsSold * suppliesPerCup.cups,
            ice: actualCupsSold * suppliesPerCup.ice,
            lemons: actualCupsSold * suppliesPerCup.lemons,
            sugar: actualCupsSold * suppliesPerCup.sugar
        };

        this.inventory.useSupplies(totalSuppliesUsed);

        // 计算收入
        const revenue = actualCupsSold * this.recipe.pricePerCup;
        this.cash += revenue;

        return {
            cupsSold: actualCupsSold,
            revenue: revenue,
            suppliesUsed: totalSuppliesUsed
        };
    }

    // 开始新的一天
    startNewDay(): void {
        this.day++;
        this.weather.generateNewDayWeather();
    }

    // 获取游戏状态摘要
    getGameStatus(): string {
        return `第 ${this.day} 天 | 现金: $${this.cash.toFixed(2)} | ${this.getInventoryStatus()}`;
    }
}