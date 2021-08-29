import anime from 'animejs';
import formUtils from '../utils/formData';

const { setFormData } = formUtils;

class FancyAlphabetEl {
  constructor(alphabet = '') {
    this.value = alphabet;
    const alphabetsContainer = document.getElementById('card-holder-name');

    if (!alphabetsContainer) return;

    this.container = document.createElement('div');
    alphabetsContainer.appendChild(this.container);

    this.container.classList.add('cc-fancy-alphabet');
    this.container.innerHTML = this.value;

    if (this.value) triggerActiveAnimation();
  }

  triggerActiveAnimation = () => {
    anime({
      targets: this.container,
      easing: 'easeOutExpo',
      keyframes: [
        { display: 'block', rotate: '30deg', opacity: 0, duration: 0 },
        { rotate: 0, opacity: 1, duration: 300 },
      ],
    });
  };

  triggerInactiveAnimations = () => {
    anime({
      targets: this.container,
      easing: 'easeOutExpo',
      opacity: [1, 0],
      duration: 300,
    });
  };

  changeValue = (alphabet) => {
    if (alphabet === this.value) return;

    this.value = alphabet;
    this.container.innerHTML = this.value || '';

    if (this.value) {
      this.triggerActiveAnimation();
    }
  };
}

const setupCardNameField = () => {
  const cardNameField = document.getElementById('cc-card-holders-name');
  const maxNameLength = 26;
  const nameAlphabets = [];
  for (let i = 0; i < maxNameLength; i++) nameAlphabets.push(new FancyAlphabetEl(''));

  // Typing Events
  cardNameField.onkeypress = (e) => {
    const isCCName =
      (e.charCode > 64 && e.charCode < 91) ||
      (e.charCode > 96 && e.charCode < 123) ||
      e.charCode == 32;
    const valueLen = e.target.value.length;
    const btwnLen = 0 <= valueLen && valueLen < maxNameLength;

    if (isCCName && btwnLen) {
      setFormData(setFormData('cardName', e.target.value));
      return true;
    }

    return false;
  };
  cardNameField.onkeyup = (e) => {
    const alphabetsPlaceholder = document.getElementById('card-holder-name-placeholder');
    const value = e.target.value;

    if (!!value) {
      alphabetsPlaceholder.classList.add('display-none');
    } else {
      alphabetsPlaceholder.classList.remove('display-none');
    }

    nameAlphabets.forEach((al, i) => {
      al.changeValue(value[i] === ' ' ? '&nbsp;' : value[i]);
    });
  };
};

export default setupCardNameField;
