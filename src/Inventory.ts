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

    // 获取当前库存
    getCurrentSupplies(): Supplies {
        return { ...this.supplies };
    }

    // 添加供应品
    addSupplies(newSupplies: Supplies): void {
        this.supplies.cups += newSupplies.cups;
        this.supplies.ice += newSupplies.ice;
        this.supplies.lemons += newSupplies.lemons;
        this.supplies.sugar += newSupplies.sugar;
    }

    // 使用供应品（制作柠檬水时）
    useSupplies(usedSupplies: Supplies): boolean {
        // 检查是否有足够的供应品
        if (this.supplies.cups < usedSupplies.cups ||
            this.supplies.ice < usedSupplies.ice ||
            this.supplies.lemons < usedSupplies.lemons ||
            this.supplies.sugar < usedSupplies.sugar) {
            return false; // 供应品不足
        }

        // 扣除使用的供应品
        this.supplies.cups -= usedSupplies.cups;
        this.supplies.ice -= usedSupplies.ice;
        this.supplies.lemons -= usedSupplies.lemons;
        this.supplies.sugar -= usedSupplies.sugar;

        return true; // 成功使用
    }

    // 检查是否可以制作指定数量的柠檬水
    canMakeLemonade(cupsToMake: number, suppliesPerCup: Supplies): number {
        const maxCupsByCups = Math.floor(this.supplies.cups / suppliesPerCup.cups);
        const maxCupsByIce = Math.floor(this.supplies.ice / suppliesPerCup.ice);
        const maxCupsByLemons = Math.floor(this.supplies.lemons / suppliesPerCup.lemons);
        const maxCupsBySugar = Math.floor(this.supplies.sugar / suppliesPerCup.sugar);

        const maxPossibleCups = Math.min(maxCupsByCups, maxCupsByIce, maxCupsByLemons, maxCupsBySugar);
        return Math.min(cupsToMake, maxPossibleCups);
    }

    // 获取库存状态字符串
    getInventoryStatus(): string {
        return `库存: 杯子 ${this.supplies.cups}, 冰块 ${this.supplies.ice}, 柠檬 ${this.supplies.lemons}, 糖 ${this.supplies.sugar}`;
    }
}