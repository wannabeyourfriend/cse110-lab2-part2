# Lemonade Stand Simulation Game

A console-based lemonade stand simulation game implemented using TypeScript.

## Features

- **Object-Oriented Design**: Built using good OOP principles
- **Weather System**: Different weather conditions affect sales volume
- **Inventory Management**: Manage inventory of cups, ice, lemons, and sugar
- **Recipe Customization**: Customize lemonade recipes and prices
- **Economic System**: Manage cash flow and supply purchasing
- **Interactive Gameplay**: Console-based user interface

## Installation and Running

### Prerequisites
- Node.js (version 14 or higher)
- npm

### Install Dependencies
```bash
npm install
```

### Run the Game
```bash
npm start
```

Or run step by step:
```bash
npm run build
node dist/main.js
```

### Development Mode
```bash
npm run dev
```

## How to Play

1. **Start Game**: You begin with $20 starting capital
2. **Check Weather**: Each day has different weather that affects sales
3. **Set Recipe**: Decide how many ingredients each cup of lemonade needs and the selling price
4. **Buy Supplies**: Purchase cups, ice, lemons, and sugar based on daily prices
5. **Sales Results**: View how many cups were sold and the revenue for the day
6. **Continue Business**: Decide whether to continue operating the next day

## Project Structure

```
src/
├── main.ts           # Game entry point
├── types.ts          # Type definitions
├── LemonadeStand.ts  # Main game logic
├── Inventory.ts      # Inventory management
├── Weather.ts        # Weather system
└── GameController.ts # User interaction control
```

## Technology Stack

- **TypeScript**: Main programming language
- **Node.js**: Runtime environment
- **readline**: Console input handling

## Development Notes

This project is an assignment for CSE110 course, focusing on learning:
- TypeScript language features
- Object-oriented programming principles
- Node.js console application development
- Version control and commit management

See `test-session.md` for detailed game session examples and design decision explanations.