// index.js
const inquirer = require('inquirer');
const { writeFile } = require('fs').promises;
const { Circle, Triangle, Square } = require('./library/shapes');
const { createSVG } = require('./library/createSVG');

const questions = [
  {
    type: 'input',
    name: 'text',
    message: 'Enter up to three characters for the logo:',
    validate: (input) => input.length <= 3 || 'Please enter up to three characters only.',
  },
  {
    type: 'input',
    name: 'textColor',
    message: 'Enter the text color (color keyword or hexadecimal number):',
  },
  {
    type: 'list',
    name: 'shape',
    message: 'Choose a shape:',
    choices: ['circle', 'triangle', 'square'],
  },
  {
    type: 'input',
    name: 'shapeColor',
    message: 'Enter the shape color (color keyword or hexadecimal number):',
  },
];

async function generateLogo() {
  try {
    const answers = await inquirer.prompt(questions);
    
    let shape;
    switch (answers.shape) {
      case 'circle':
        shape = new Circle();
        break;
      case 'triangle':
        shape = new Triangle();
        break;
      case 'square':
        shape = new Square();
        break;
    }
    
    shape.setColor(answers.shapeColor);
    
    const svgContent = createSVG(shape, answers.text, answers.textColor);
    
    await writeFile('logo.svg', svgContent);
    console.log('Generated logo.svg');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

generateLogo();
