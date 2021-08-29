import { DEFAULT_CVC_LENGTH } from '../utils/cardTypes';
import formUtils from '../utils/formData';

const { setFormData } = formUtils;

const setupCVVField = () => {
  const cvvField = document.getElementById('cc-card-cvv');
  let ccContainer = document.getElementById('cc-card-container');

  // Flip Events
  cvvField.addEventListener('focus', () => {
    ccContainer = document.getElementById('cc-card-container');
    if (ccContainer) ccContainer.classList.add('flip-back');
  });
  cvvField.addEventListener('blur', () => {
    ccContainer = document.getElementById('cc-card-container');
    if (ccContainer) ccContainer.classList.remove('flip-back');
  });

  // Typing Events
  cvvField.onkeypress = (e) => {
    const isNumber = /[0-9]/.test(e.key);
    const valueLen = e.target.value.toString().length;
    const btwnLen = 0 <= valueLen && valueLen < DEFAULT_CVC_LENGTH;

    if (isNumber && btwnLen) {
      setFormData(setFormData('cvv', e.target.value));
      return true;
    }

    return false;
  };
  cvvField.onkeyup = (e) => {
    const cvvText = document.getElementById('cc-cvv-text');
    if (cvvText) cvvText.innerHTML = e.target.value;
  };
};

export default setupCVVField;
