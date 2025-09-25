# Lemonade Stand Simulation Game - Test Session Log

## Game Overview
This is a lemonade stand simulation game implemented using TypeScript, where players need to manage inventory, create recipes, purchase supplies, and sell lemonade based on weather conditions.

## Game Features
- **Object-Oriented Design**: Uses multiple classes to manage different game components
- **Weather System**: Weather changes that affect daily sales
- **Inventory Management**: Track inventory of cups, ice, lemons, and sugar
- **Recipe Customization**: Players can adjust lemonade recipes and prices
- **Economic System**: Manage cash flow and supply costs

## Typical Game Session Example

```
Welcome to the Lemonade Stand Simulation Game!
You have $20 starting capital.
Goal: Make money by selling lemonade!
=====================================

Day 1 | Cash: $20.00 | Inventory: Cups 0, Ice 0, Lemons 0, Sugar 0
Weather: Warm - Normal lemonade selling weather
Current recipe: Each cup needs 1 cups, 2 ice, 1 lemons, 1 sugar
Price: $0.25 per cup

Today's supply prices:
   Cups: $0.025 each
   Ice: $0.012 each
   Lemons: $0.041 each
   Sugar: $0.028 each

Do you want to change the recipe? (y/n): n
You have $20.00
Inventory: Cups 0, Ice 0, Lemons 0, Sugar 0
How many cups to buy?: 50
How many ice to buy?: 100
How many lemons to buy?: 50
How many sugar to buy?: 50
Total cost: $6.55
Purchase successful!
Inventory: Cups 50, Ice 100, Lemons 50, Sugar 50

Today's sales result:
Cups sold: 18
Revenue: $4.50
Supplies used: Cups 18, Ice 36, Lemons 18, Sugar 18
Current cash: $17.95

Continue to next day? (y/n): y

Day 2 | Cash: $17.95 | Inventory: Cups 32, Ice 64, Lemons 32, Sugar 32
Weather: Hot - People crave refreshing lemonade!
Current recipe: Each cup needs 1 cups, 2 ice, 1 lemons, 1 sugar
Price: $0.25 per cup

Today's supply prices:
   Cups: $0.023 each
   Ice: $0.014 each
   Lemons: $0.039 each
   Sugar: $0.025 each

Do you want to change the recipe? (y/n): y

Change recipe:
How many cups per serving? (current: 1): 1
How many ice per serving? (current: 2): 3
How many lemons per serving? (current: 1): 1
How many sugar per serving? (current: 1): 1
Price per cup? (current: $0.25): 0.35
Recipe updated!

You have $17.95
Inventory: Cups 32, Ice 64, Lemons 32, Sugar 32
How many cups to buy?: 20
How many ice to buy?: 60
How many lemons to buy?: 20
How many sugar to buy?: 20
Total cost: $2.54
Purchase successful!
Inventory: Cups 52, Ice 124, Lemons 52, Sugar 52

Today's sales result:
Cups sold: 31
Revenue: $10.85
Supplies used: Cups 31, Ice 93, Lemons 31, Sugar 31
Current cash: $26.26

Continue to next day? (y/n): n
Thanks for playing!
```

## Design Decision Explanation

### 1. Class Structure Design
- **LemonadeStand**: Main game logic class, manages overall state
- **Inventory**: Specialized inventory management, follows single responsibility principle
- **Weather**: Independent weather system, affects sales
- **GameController**: Handles user interaction, separates UI logic

### 2. TypeScript Features Usage
- **Interface Definition**: Uses interfaces to define data structures, provides type safety
- **Enums**: Uses enum to define weather types, improves code readability
- **Type Annotations**: All methods and properties have clear type definitions
- **ES Modules**: Uses modern import/export syntax

### 3. Game Balance Design
- **Weather Impact**: Different weather has different impact coefficients on sales
- **Supply Prices**: Daily prices have random fluctuations, adding strategy
- **Recipe System**: Players can adjust recipes to optimize costs and sales

## TypeScript vs Java Comparison

### Similarities:
- Both support object-oriented programming
- Both have strong type systems
- Both support interfaces and classes
- Both have good IDE support

### Differences:
- **Compilation Target**: TypeScript compiles to JavaScript, Java compiles to bytecode
- **Runtime Environment**: TypeScript runs on JavaScript engines, more flexible
- **Type System**: TypeScript's type system is more flexible, supports union types, optional properties, etc.
- **Syntax**: TypeScript syntax is closer to modern JavaScript, more concise
- **Ecosystem**: TypeScript can directly use npm ecosystem

## TypeScript Knowledge Learned

1. **Module System**: Learned to use and configure ES modules
2. **Asynchronous Programming**: Using Promise and async/await to handle user input
3. **Type Definition**: Creating and using interfaces, enums, and other type definitions
4. **Compilation Configuration**: Configuring tsconfig.json and package.json
5. **Node.js Integration**: Using readline module to handle console input

## Possible Improvements

1. **Data Persistence**: Add save/load game functionality
2. **More Events**: Add random events that affect the game
3. **Graphical Interface**: Use web technologies to create graphical interface
4. **Multiplayer Mode**: Support multiple players competing
5. **More Complex Economic System**: Add loans, investments, and other features