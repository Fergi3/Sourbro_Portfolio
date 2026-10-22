const recipes = [      //Built-in and saved recipes use the same structure so one selector can show both.
    {
        id: 'rustic',
        name: 'Rustic Sourdough',
        type: 'built-in',
        ingredients: { starter: 100, water: 350, flour: 500, salt: 10 }
    },
    {
        id: 'whole-wheat',
        name: 'Whole Wheat',
        type: 'built-in',
        ingredients: { starter: 100, water: 375, flour: 500, salt: 10 }
    },
    {
        id: 'cheddar-jalapeno',
        name: 'Cheddar Jalapeño',
        type: 'built-in',
        ingredients: { starter: 100, water: 350, flour: 500, salt: 10 },
        addInIds: ['addCheddar', 'addJalapeno']
    }
];

export default recipes;