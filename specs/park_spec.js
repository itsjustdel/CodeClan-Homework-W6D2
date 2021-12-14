const assert = require('assert');
const Park = require('../models/park.js');
const Dinosaur = require('../models/dinosaur.js');

describe('Park', function() {

  let park;

  beforeEach(function () {
    park = new Park(`BlamJam's Bizzaro World (of dinos)`, 178);
  });

  it('should have a name',function(){
    const actual = park.name;
    assert.strictEqual(actual, `BlamJam's Bizzaro World (of dinos)`);
  });

  it('should have a ticket price', function(){
    const actual = park.ticketPrice;
    assert.strictEqual(actual, 178);
  });

  it('should have a collection of dinosaurs', function(){
    const actual = park.dinosaurs.length;
    assert.strictEqual(actual,3);
  });

  it('should be able to add a dinosaur to its collection', function(){
    let newDino = new Dinosaur('Lady dino','carnivore',378);
    park.addDinosaur(newDino);    
    const actual = park.dinosaurs[park.dinosaurs.length-1].species;
    assert.strictEqual(actual, 'Lady dino');
  });

  it('should be able to remove a dinosaur from its collection', function(){
    park.removeDinosaur('Little dino');
    const actual = park.dinosaurs.length;
    assert.strictEqual(actual, 2);
  });


  it('should be able to find the dinosaur that attracts the most visitors', function(){
     const actual = park.mostPopularDinosaur();
     assert.deepStrictEqual(actual, park.dinosaurs[1]);

  });

  it('should be able to find all dinosaurs of a particular species', function(){
    let newDino1 =new Dinosaur('Multi dino','herbivore',100) ;
    let newDino2 =new Dinosaur('Multi dino','herbivore',110) ;
    park.addDinosaur(newDino1);
    park.addDinosaur(newDino2);
    const actual = park.allDinosaursOfSpecies('Multi dino');
    assert.deepStrictEqual(actual, [newDino1, newDino2] );

  });

  it('should be able to calculate the total number of visitors per day', function(){
    const actual = park.totalVisitorsPerDay();
    assert.strictEqual(actual, 150);
  });
    

  it('should be able to calculate the total number of visitors per year', function(){
    let isLeapYear = false;
    const actual = park.totalVisitorsPerYear(isLeapYear);
    assert.strictEqual(actual,54750);
  });

  it('should be able to calculate total revenue for one year', function(){
    let isLeapYear = true;
    const actual = park.totalRevenueForYear(isLeapYear);
    assert.strictEqual(actual, 9772200);
  });

  it('should be able to remove all dinosaurs of a particular species', function(){
    let species = 'Big dino';
    let newDino1 =new Dinosaur(species,'herbivore',100);
    let newDino2 =new Dinosaur(species,'herbivore',110);
    park.addDinosaur(newDino1);
    park.addDinosaur(newDino2);
    park.removeAllDinosaurOfSpecies(species);
    //check there are no dinos returned from the search
    const actual = park.allDinosaursOfSpecies(species);
    assert.deepStrictEqual(actual, [] );
  });

  it('should be able to provide an object with diet types and number of dinosuars with that type', function(){
    let newDino1 =new Dinosaur('Big Dino','herbivore',100);    
    park.addDinosaur(newDino1);
    //returns dictionary
    const actual = park.dinosaursAndDiets();
    assert.deepStrictEqual(actual, { herbivore: 2, carnivore: 1, omnivore: 1 });
  });
});

