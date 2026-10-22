const addInGroups = [
    { id: 'cheese', name: 'Cheese' },
    { id: 'savory', name: 'Savory & Herbs' },
    { id: 'fruit', name: 'Fruit & Nuts' },
    { id: 'other', name: 'Other' }
];

const addIns = [   //Suggested add-ins include a group and recomment amount per loaf.
    { id: 'addCheddar', name: 'Cheddar', group: 'Cheese', gramsPerLoaf: 100 },
    { id: 'addParm', name: 'Parmesan', group: 'Cheese', gramsPerLoaf: 100 },
    { id: 'addJalapeno', name: 'Jalapeños', group: 'Savory & Herbs', gramsPerLoaf: 30 },
    { id: 'addGarlic', name: 'Roasted garlic', group: 'Savory & Herbs', gramsPerLoaf: 25 },
    { id: 'addRosemary', name: 'Fresh rosemary', group: 'Savory & Herbs', gramsPerLoaf: 5 },
    { id: 'addOlives', name: 'Pitted olives', group: 'Savory & Herbs', gramsPerLoaf: 100 },
    { id: 'addWalnuts', name: 'Toasted walnuts', group: 'Fruit & Nuts', gramsPerLoaf: 80 },
    { id: 'addCranberries', name: 'Dried cranberries', group: 'Fruit & Nuts', gramsPerLoaf: 55 }
];

export { addInGroups, addIns };