import formUtils from '../utils/formData';
import { getCardType } from '../utils/cardTypes';
import FlipAniEl from '../utils/flipAniEl';

const { setFormData } = formUtils;

class FancyNumberEl {
  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'cc-card-number-digit-container';

    this.noNumberNode = document.createElement('div');
    this.noNumberNode.innerHTML = '#';
    this.noNumberNode.className = 'cc-card-number-no-digit active';

    this.numberNode = document.createElement('div');
    this.numberNode.className = 'cc-card-number-digit';

    this.container.appendChild(this.noNumberNode);
    this.container.appendChild(this.numberNode);
    const numberContainer = document.getElementById('cc-card-number-text');
    if (numberContainer) numberContainer.appendChild(this.container);

    this.value = '';
  }

  changeValue = (value = '') => {
    this.value = value || '#';

    if (value) {
      this.numberNode.innerHTML = value;
      this.noNumberNode.classList.remove('active');
      this.numberNode.classList.add('active');
    } else {
      this.numberNode.classList.remove('active');
      this.noNumberNode.classList.add('active');
    }
  };
}

class SetupCardType {
  constructor() {
    this.types = {
      AMEX: { imageURL: 'amex' },
      VISA: { imageURL: 'visa' },
      MASTERCARD: { imageURL: 'mastercard' },
      MAESTRO: { imageURL: 'mastercard' },
      RUPAY: { imageURL: 'rupay' },
    };
    this.type = '';
    this.flipEl = new FlipAniEl('cc-type-img-container', undefined, 'cc-type', '');
  }

  changeImg = (type) => {
    // If no type or no image is available, then clear all cc type images
    if (!type || !this.types[type]) {
      this.flipEl.changeValue('');
      document.getElementById('cc-type-img-back').src = '';
      return;
    }

    const imgURL = `./images/${this.types[type].imageURL}.png`;

    // Construct cc type image for card front and send it flipEl
    const imgEl = document.createElement('img');
    imgEl.src = imgURL;
    imgEl.className = 'cc-type-img';
    imgEl.alt = `cc-type-img`;

    this.flipEl.changeValue(imgURL, imgEl, { translateX: '-100%' });

    // Change URL of cc type image for card back
    document.getElementById('cc-type-img-back').src = imgURL;
  };

  changeType = (type) => {
    if (type === this.type) return;

    this.type = type;
    setFormData('type', type);
    this.changeImg(type);
  };
}

const setupCardNumberField = () => {
  const typeImg = new SetupCardType();

  const numberInstances = [];
  const noOfDigits = 16;
  for (let i = 0; i < noOfDigits; i++) {
    const numberNode = new FancyNumberEl();
    numberInstances.push(numberNode);
  }

  const cardNoField = document.getElementById('cc-card-number');

  // Typing Events
  cardNoField.onkeypress = (e) => {
    const isCCNumber = e.charCode >= 48 && e.charCode <= 57;
    const valueLen = e.target.value.toString().replace(' ', '').length;
    const btwnLen = 0 <= valueLen && valueLen < 16;

    if (isCCNumber && btwnLen) {
      setFormData(setFormData('cardNo', e.target.value));

      // Set cc type
      const cardType = getCardType(e.target.value);
      typeImg.changeType(cardType);

      return true;
    }

    return false;
  };
  cardNoField.onkeyup = (e) => {
    const numbers = e.target.value.toString().replace(' ', '').split('');
    for (let i = 0; i < 16; i++) numberInstances[i].changeValue(numbers[i]);
  };
};

export default setupCardNumberField;
