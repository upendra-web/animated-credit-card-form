import anime from 'animejs';

import setupCardNumberField from './components/cardNumber';
import setupCVVField from './components/cvvNumber';
import setupCardNameField from './components/cardName';
import setupExpiryDate from './components/expiryDate';
import setupHighlight from './components/followHighlight';

const setupCardBkg = () => {
  const bkgImg = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("../images/${anime.random(
    1,
    25
  )}.jpeg")`;
  document.querySelector('.cc-front').style = `background-image: ${bkgImg}`;
  document.querySelector('.cc-back').style = `background-image: ${bkgImg}`;
};

// IIFE
(function () {
  setupCardBkg();

  setupCardNumberField();

  setupCardNameField();

  setupExpiryDate();

  setupCVVField();

  setupHighlight();
})();
