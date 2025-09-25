import { WeatherType } from './types.js';

export class Weather {
    private currentWeather: WeatherType;

    constructor() {
        this.currentWeather = this.generateRandomWeather();
    }

    // Generate random weather
    private generateRandomWeather(): WeatherType {
        const weatherTypes = Object.values(WeatherType);
        const randomIndex = Math.floor(Math.random() * weatherTypes.length);
        return weatherTypes[randomIndex];
    }

    // Get current weather
    getCurrentWeather(): WeatherType {
        return this.currentWeather;
    }

    // Generate new day weather
    generateNewDayWeather(): WeatherType {
        this.currentWeather = this.generateRandomWeather();
        return this.currentWeather;
    }

    // Get sales multiplier based on weather
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

    // Get weather description
    getWeatherDescription(): string {
        switch (this.currentWeather) {
            case WeatherType.COLD:
                return "Cold - Few people want lemonade";
            case WeatherType.COOL:
                return "Cool - Some people might buy lemonade";
            case WeatherType.WARM:
                return "Warm - Normal lemonade selling weather";
            case WeatherType.HOT:
                return "Hot - People crave refreshing lemonade!";
            default:
                return "Unknown weather";
        }
    }
}