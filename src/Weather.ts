import { WeatherType } from './types.js';

export class Weather {
    private currentWeather: WeatherType;

    constructor() {
        this.currentWeather = this.generateRandomWeather();
    }

    // 生成随机天气
    private generateRandomWeather(): WeatherType {
        const weatherTypes = Object.values(WeatherType);
        const randomIndex = Math.floor(Math.random() * weatherTypes.length);
        return weatherTypes[randomIndex];
    }

    // 获取当前天气
    getCurrentWeather(): WeatherType {
        return this.currentWeather;
    }

    // 生成新的一天的天气
    generateNewDayWeather(): WeatherType {
        this.currentWeather = this.generateRandomWeather();
        return this.currentWeather;
    }

    // 根据天气获取销售倍数
    getSalesMultiplier(): number {
        switch (this.currentWeather) {
            case WeatherType.COLD:
                return 0.3;
            case WeatherType.COOL:
                return 0.6;
            case WeatherType.WARM:
                return 1.0;
            case WeatherType.HOT:
                return 1.5;
            default:
                return 1.0;
        }
    }

    // 获取天气描述
    getWeatherDescription(): string {
        switch (this.currentWeather) {
            case WeatherType.COLD:
                return "寒冷 - 很少有人想喝柠檬水";
            case WeatherType.COOL:
                return "凉爽 - 一些人可能会买柠檬水";
            case WeatherType.WARM:
                return "温暖 - 正常的柠檬水销售天气";
            case WeatherType.HOT:
                return "炎热 - 人们渴望清凉的柠檬水！";
            default:
                return "未知天气";
        }
    }
}