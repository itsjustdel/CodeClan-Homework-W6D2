const Dinosaur = require("./dinosaur");

const Park = function(name, ticketPrice){
    this.name = name;
    this.ticketPrice = ticketPrice;
    this.dinosaurs = [  new Dinosaur('Big dino', 'herbivore', 50),
                        new Dinosaur('Little dino', 'carnivore', 75),
                        new Dinosaur('Drunk dino', 'omnivore', 25)];
}


Park.prototype.addDinosaur = function(dinosaur){    
    this.dinosaurs.push(dinosaur);
}
Park.prototype.removeDinosaur = function(species){
    for(let i = 0; i < this.dinosaurs.length; i++){
            if (this.dinosaurs[i].species === species){
                this.dinosaurs.splice(i, 1);
                return;
            }            
    }
}
Park.prototype.mostPopularDinosaur = function(){
    //run through each dinosaur and remember which index was the highest
    let highestGuests = -1;
    let highestDinoIndex;
    for(let i=0; i < this.dinosaurs.length; i++){
        if (this.dinosaurs[i].guestsAttractedPerDay > highestGuests){
            //set counter
            highestGuests = this.dinosaurs[i].guestsAttractedPerDay;
            //remember what position this dino was in the array
            highestDinoIndex = i;
        }
    }

    return this.dinosaurs[highestDinoIndex];
}

Park.prototype.allDinosaursOfSpecies = function(species){
    dinosOfSameSpecies = [];
    for (let dino of this.dinosaurs){
        if (dino.species === species){
            dinosOfSameSpecies.push(dino);
        }
    }

    return dinosOfSameSpecies;
}
Park.prototype.totalVisitorsPerDay = function(){
    let count = 0;
    for (let dino of this.dinosaurs){
        count += dino.guestsAttractedPerDay;        
    }
    return count;
}

Park.prototype.totalVisitorsPerYear = function(isLeapYear){
    let totalVisitorsPerDay = this.totalVisitorsPerDay();
    if (isLeapYear){
        return totalVisitorsPerDay *= 366;
    }
    else{
        return totalVisitorsPerDay *= 365;
    }
}

Park.prototype.totalRevenueForYear = function(isLeapYear){    
    let totalVisitorsPerYear = this.totalVisitorsPerYear(isLeapYear);
    return totalVisitorsPerYear *= this.ticketPrice;
}

Park.prototype.removeAllDinosaurOfSpecies = function(species){   
    // safely remove by starting at last index and working backwards
    for (let i = this.dinosaurs.length-1; i > -1; i--){        
        if (this.dinosaurs[i].species === species){
            this.dinosaurs.splice(i,1);
        }
    }
}

Park.prototype.dinosaursAndDiets = function(){
    let dietsAndTotals = {};
    for (let dino of this.dinosaurs){
        // check if we have created this diet before
         if (dino.diet in dietsAndTotals)
         {
             //we can just add 1 to the value
             dietsAndTotals[dino.diet]++;
         }
         else
         {
            //create a key value pair, starting at 1 for value
            dietsAndTotals[dino.diet] = 1;
         }
    }

    return dietsAndTotals;
}

module.exports = Park;