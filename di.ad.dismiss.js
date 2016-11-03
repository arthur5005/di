// ==UserScript==
// @name         Show Ad, Close Ad, Digitally Imported
// @namespace    https://github.com/arthur5005/di
// @description  Closes the ad dialog box that interrupts the stream
// @include      http://www.di.fm/*
// @exclude      https://www.di.fm/login
// @grant        none
// @author       Arthur Goldsmith
// @version      1.0
// ==/UserScript==
/* jshint -W097 */
'use strict';
/* globals console */

console = console || { log: console.log = console.__proto__.log };

var isWaitingForAd = false;
setInterval(function() {
    if(isWaitingForAd) {
        return;
    }
    console.log('hunting for modal...');
    var modal = document.getElementById('midroll-interrupt-modal');
    if (typeof(modal) !== 'undefined' && modal !== null && modal.children.length !== 0) {
        console.log('Modal found.');
        document.querySelectorAll(".modal-btn.continue")[0].click();
        isWaitingForAd = true;
        console.log('Continue button clicked, waiting for countdown button to display');
        setTimeout(function() {
            document.querySelectorAll('.modal-btn.countdown-btn')[0].click();
            isWaitingForAd = false;
            console.log('Countdown button clicked, resuming modal hunt');
        }, 11000);
    }
}, 1000);