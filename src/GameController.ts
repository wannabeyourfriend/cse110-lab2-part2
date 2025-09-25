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

    // 启动游戏
    async startGame(): Promise<void> {
        console.log("🍋 欢迎来到柠檬水摊位模拟游戏！ 🍋");
        console.log("你有 $20 的启动资金。");
        console.log("目标：通过销售柠檬水赚钱！");
        console.log("=====================================\n");

        await this.gameLoop();
    }

    // 主游戏循环
    private async gameLoop(): Promise<void> {
        while (true) {
            console.log(`\n📅 ${this.lemonadeStand.getGameStatus()}`);
            console.log(`🌤️  天气: ${this.lemonadeStand.getWeatherInfo()}`);
            
            // 显示当前配方
            const recipe = this.lemonadeStand.getRecipe();
            console.log(`📋 当前配方: 每杯需要 ${recipe.cupsPerServing} 杯子, ${recipe.icePerServing} 冰块, ${recipe.lemonsPerServing} 柠檬, ${recipe.sugarPerServing} 糖`);
            console.log(`💰 售价: $${recipe.pricePerCup.toFixed(2)} 每杯\n`);

            // 生成今日价格
            const dailyPrices = this.lemonadeStand.generateDailyPrices();
            this.displayPrices(dailyPrices);

            // 询问是否要修改配方
            const wantToChangeRecipe = await this.askYesNo("是否要修改配方？(y/n): ");
            if (wantToChangeRecipe) {
                await this.changeRecipe();
            }

            // 购买供应品
            await this.buySuppliesPhase(dailyPrices);

            // 模拟销售
            const salesResult = this.lemonadeStand.simulateDaySales();
            this.displaySalesResult(salesResult);

            // 检查游戏结束条件
            if (this.lemonadeStand.getCash() <= 0) {
                console.log("\n💸 你的现金用完了！游戏结束！");
                break;
            }

            // 询问是否继续
            const continueGame = await this.askYesNo("\n继续下一天？(y/n): ");
            if (!continueGame) {
                console.log("感谢游玩！");
                break;
            }

            this.lemonadeStand.startNewDay();
        }

        this.rl.close();
    }

    // 显示价格
    private displayPrices(prices: SupplyPrices): void {
        console.log("🏪 今日供应品价格:");
        console.log(`   杯子: $${prices.cups.toFixed(3)} 每个`);
        console.log(`   冰块: $${prices.ice.toFixed(3)} 每个`);
        console.log(`   柠檬: $${prices.lemons.toFixed(3)} 每个`);
        console.log(`   糖:   $${prices.sugar.toFixed(3)} 每个\n`);
    }

    // 修改配方
    private async changeRecipe(): Promise<void> {
        console.log("\n📝 修改配方:");
        
        const cupsPerServing = await this.askNumber("每杯需要多少个杯子？(当前: 1): ", 1);
        const icePerServing = await this.askNumber("每杯需要多少个冰块？(当前: 2): ", 2);
        const lemonsPerServing = await this.askNumber("每杯需要多少个柠檬？(当前: 1): ", 1);
        const sugarPerServing = await this.askNumber("每杯需要多少个糖？(当前: 1): ", 1);
        const pricePerCup = await this.askNumber("每杯售价多少？(当前: $0.25): ", 0.25);

        this.lemonadeStand.updateRecipe({
            cupsPerServing,
            icePerServing,
            lemonsPerServing,
            sugarPerServing,
            pricePerCup
        });

        console.log("✅ 配方已更新！");
    }

    // 购买供应品阶段
    private async buySuppliesPhase(prices: SupplyPrices): Promise<void> {
        console.log(`💰 你有 $${this.lemonadeStand.getCash().toFixed(2)}`);
        console.log(this.lemonadeStand.getInventoryStatus());
        
        const cups = await this.askNumber("购买多少个杯子？: ", 0);
        const ice = await this.askNumber("购买多少个冰块？: ", 0);
        const lemons = await this.askNumber("购买多少个柠檬？: ", 0);
        const sugar = await this.askNumber("购买多少个糖？: ", 0);

        const supplies: Supplies = { cups, ice, lemons, sugar };
        
        // 计算总成本
        const totalCost = 
            supplies.cups * prices.cups +
            supplies.ice * prices.ice +
            supplies.lemons * prices.lemons +
            supplies.sugar * prices.sugar;

        console.log(`💵 总成本: $${totalCost.toFixed(2)}`);

        if (totalCost > this.lemonadeStand.getCash()) {
            console.log("❌ 现金不足！");
            return;
        }

        const success = this.lemonadeStand.buySupplies(supplies, prices);
        if (success) {
            console.log("✅ 购买成功！");
            console.log(this.lemonadeStand.getInventoryStatus());
        } else {
            console.log("❌ 购买失败！");
        }
    }

    // 显示销售结果
    private displaySalesResult(salesResult: any): void {
        console.log("\n📊 今日销售结果:");
        console.log(`🥤 售出杯数: ${salesResult.cupsSold}`);
        console.log(`💰 收入: $${salesResult.revenue.toFixed(2)}`);
        console.log(`📦 使用的供应品: 杯子 ${salesResult.suppliesUsed.cups}, 冰块 ${salesResult.suppliesUsed.ice}, 柠檬 ${salesResult.suppliesUsed.lemons}, 糖 ${salesResult.suppliesUsed.sugar}`);
        console.log(`💵 当前现金: $${this.lemonadeStand.getCash().toFixed(2)}`);
    }

    // 询问是否问题
    private askYesNo(question: string): Promise<boolean> {
        return new Promise((resolve) => {
            this.rl.question(question, (answer) => {
                resolve(answer.toLowerCase().startsWith('y'));
            });
        });
    }

    // 询问数字
    private askNumber(question: string, defaultValue: number): Promise<number> {
        return new Promise((resolve) => {
            this.rl.question(question, (answer) => {
                const num = parseFloat(answer);
                resolve(isNaN(num) ? defaultValue : num);
            });
        });
    }
}