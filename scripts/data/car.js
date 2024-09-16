class Car {
    #brand;
    #model;
    speed = 0;
    isTrunkOpen = false;

    constructor(brand, model) {
        this.#brand = brand;
        this.#model = model;
    }

    displayInfo() {
        const trunkStatus = this.isTrunkOpen ? 'open' : 'closed';

        console.log(`brand: ${this.#brand}\nmodel: ${this.#model}\nSpeed: ${this.speed} km/h\nTrunk status: ${trunkStatus}`);
    }

    go() {
        if (!this.isTrunkOpen) {

            this.speed += 5;

            if (this.speed > 200)
                this.speed = 200;
        }
        else{
            console.log('Failed. Trunk is open.');
        }
    }

    break() {
        this.speed -= 5;

        if (this.speed < 0)
            this.speed = 0;
    }

    openTrunk(){
        if (this.speed === 0){
            this.isTrunkOpen = true;
        }
        else{
            console.log('Failed. The car is moving.');
        }
    }

    closeTrunk(){
        this.isTrunkOpen = false;
    }
}

class RaceCar extends Car{
    acceleration;

    constructor(brand, model, acceleration){
        super(brand, model);
        this.acceleration = acceleration;
    }

    go(){
        if (!this.isTrunkOpen) {

            this.speed += this.acceleration;

            if (this.speed > 300)
                this.speed = 300;
        }
        else{
            console.log('Failed. Trunk is open.');
        }
    }

    openTrunk(){
        console.log('no trunk');
    }

    closeTrunk(){
        console.log('no trunk');
    }
}

const car1 = new Car('Toyota', 'Corolla');
const car2 = new Car('Tesla', '#model 3');

console.log(car1);
console.log(car2);

car1.go();
car1.go();
car1.go();
car1.go();
car1.go();

car2.go();
car2.go();
car2.go();
car2.break();

car1.openTrunk();

car1.displayInfo();
car2.displayInfo();

car2.break();
car2.break();
car2.openTrunk();
car2.go();

car2.displayInfo();

car2.closeTrunk();
car2.go();

car2.displayInfo();

const raceCar1 = new RaceCar('McLaren', 'F1', 20);

raceCar1.go();
raceCar1.break();
raceCar1.openTrunk();

raceCar1.displayInfo();