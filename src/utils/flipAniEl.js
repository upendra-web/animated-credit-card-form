import anime from 'animejs';

class FlipAniEl {
  constructor(containerID, placeholderEl, flipElID, value = '') {
    this.flipContainer = document.getElementById(containerID);

    // Placeholder setup
    this.placeholderEl = placeholderEl;
    if (this.placeholderEl) this.placeholderEl.id = `${flipElID}-placeholder-flip-el`;

    // CurEl setup
    this.curEl = document.createElement('div');
    this.curEl.className = `cur-flip-el`;
    this.flipContainer.appendChild(this.curEl);

    // Value
    this.value = value;
  }

  changeValue = (value, innerHTML = undefined, otherStyles = {}) => {
    this.value = value;

    if (!value) {
      // Show Placholder
      if (this.placeholderEl) this.placeholderEl.classList.remove('opacity-0');

      // Hide curEl
      anime({
        targets: this.curEl,
        opacity: 0,
        duration: 0,
      });
    } else {
      // Hide Placeholder
      if (this.placeholderEl) this.placeholderEl.classList.add('opacity-0');

      // Set curEl value and bring to top
      if (innerHTML) {
        this.curEl.innerHTML = '';
        this.curEl.appendChild(innerHTML);
      } else {
        this.curEl.innerHTML = value;
      }

      anime({
        easing: 'easeOutExpo',
        targets: this.curEl,
        keyframes: [
          {
            opacity: 0,
            translateY: 15,
            translateX: '-50%',
            ...otherStyles,
            duration: 0,
          },
          {
            opacity: 1,
            translateY: 0,
            translateX: '-50%',
            ...otherStyles,
            duration: 300,
          },
        ],
      });
    }
  };
}

export default FlipAniEl;
