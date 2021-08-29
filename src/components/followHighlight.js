import anime from 'animejs';

class FollowHighlight {
  constructor() {
    this.curElID = '';
    this.followables = {
      'cc-card-number': 'cc-card-number-text',
      'cc-card-holders-name': 'cc-holder-name-text',
      'cc-card-expiry-month': 'cc-expiry-date-text',
      'cc-card-expiry-year': 'cc-expiry-date-text',
    };

    this.node = document.createElement('div');
    this.node.id = 'cc-follow-highlight';
    this.visible = false;
    document.body.appendChild(this.node);

    this.setupEvents();
  }

  setupEvents = () => {
    Object.keys(this.followables).forEach((id) => {
      const el = document.getElementById(id);
      el.onfocus = () => this.moveHighlight(id);
      el.onblur = this.hideHightlight;
    });
  };

  moveHighlight = (id) => {
    this.curElID = id;
    const el = document.getElementById(id);
    if (this.visible) anime.remove(this.node);

    const { width, height, top, left } = document
      .getElementById(this.followables[id])
      .getBoundingClientRect();
    const offsetDim = 15;
    const offsetPos = offsetDim / 2;

    if (!this.visible) {
      anime({
        targets: this.node,
        easing: 'easeOutExpo',
        keyframes: [
          {
            top: top - offsetPos,
            left: left - offsetPos,
            width: width + offsetDim,
            height: height + offsetDim,
            opacity: 0,
            duration: 0,
          },
          { opacity: 1, duration: 500 },
        ],
      });
    } else {
      anime({
        targets: this.node,
        easing: 'easeOutExpo',
        top: [this.node.style.top, top - offsetPos],
        left: [this.node.style.left, left - offsetPos],
        width: [this.node.style.width, width + offsetDim],
        height: [this.node.style.height, height + offsetDim],
        duration: 500,
      });
    }

    this.visible = true;
  };

  hideHightlight = () => {
    this.curElID = '';
    const self = this;

    anime({
      targets: this.node,
      opacity: 0,
      duration: 300,
      complete: () => {
        self.visible = false;
      },
    });
  };
}

const setupHighlight = () => {
  new FollowHighlight();
};

export default setupHighlight;
