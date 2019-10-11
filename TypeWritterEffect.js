

const TypeWriter = function (txtElement, words, wait = 3000) {

    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeliting = false;

}

//  Type Method

TypeWriter.prototype.type = function () {

    //   Curent Index of Words

    const current = this.wordIndex % this.words.length;

    //   Get Full Text of Current Word

    const fullTxt = this.words[current];

    //   Check if Deliting

    if (this.isDeliting) {

        //  Remove a Character

        this.txt = fullTxt.substring(0, this.txt.length - 1);


    } else {

        //  Add a Caracter

        this.txt = fullTxt.substring(0, this.txt.length + 1);

    }

    //   Insert TXT Into Element

    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;


    //   Initial Type Speed 

    let typeSpeed = 300;

    if (this.isDeliting) {

        typeSpeed /= 2;

    }

    //   If Word is Complete

    if (!this.isDeliting && this.txt === fullTxt) {

        //  Make a Pause at the End

        typeSpeed = this.wait;

        //  Set Delete to True

        this.isDeliting = true;

    } else if (this.isDeliting && this.txt === '') {

        this.isDeliting = false;

        //  Move to the Next Word

        this.wordIndex++;

        //  Pause Before Start Typing

        typeSpeed = 500;

    }


    setTimeout(() => this.type(), typeSpeed);

}



//  Init od DOM Load

document.addEventListener('DOMContentLoaded', init);


//  Init App

function init() {


    const txtElement = document.querySelector('.txt-type');

    const words = JSON.parse(txtElement.getAttribute('data-words'));

    const wait = txtElement.getAttribute('data-wait');

    //  Init Type Writter

    new TypeWriter(txtElement, words, wait);

}