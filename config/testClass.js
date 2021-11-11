import React, { Component } from 'react';


class Test extends Component {
    constructor(text) {
        this.text = text;
    }

    logTest() {
        return(
            console.log(this.text)
        );
    }
}