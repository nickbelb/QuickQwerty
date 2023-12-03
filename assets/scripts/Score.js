'use strict';

export class Score{
    #score;
    #date;
    #percentage;

    

    constructor(score,date){
        this.#score=score;
        this.#date=date;
    }

    get score(){
        return this.#score;
    }

    get date(){
        return `${this.#date.getDate()}/${this.#date.getMonth()+1}/${this.#date.getFullYear()} `;
    }

    get percentage(){
        return Math.round((this.#score*100)/120);
    }

    
}