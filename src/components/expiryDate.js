import FlipAniEl from '../utils/flipAniEl';
import formUtils from '../utils/formData';

const { setFormData } = formUtils;

class ExpiryDate {
  constructor() {
    // Add months and years options in required select fields
    this.addMonths();
    this.addYears();

    // Setup month and year fields(add events)
    this.setUpMonthField();
    this.setUpYearField();
  }

  getOption = (title, value, className) => {
    const opt = document.createElement('option');
    opt.value = value;
    opt.innerHTML = title;
    opt.className = className;
    return opt;
  };

  getPlaceholderOption = (title) => {
    const opt = this.getOption(title, '', 'form-select-placeholder');
    opt.disabled = true;
    opt.selected = true;
    return opt;
  };

  addMonths = () => {
    // Add months options
    const monthsSelectEl = document.getElementById('cc-card-expiry-month');
    monthsSelectEl.value = '';

    if (monthsSelectEl) {
      const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
      // Add placeholder option
      const opt = this.getPlaceholderOption('Month');
      monthsSelectEl.appendChild(opt);

      months.forEach((m) => {
        const opt = this.getOption(m, m);
        monthsSelectEl.appendChild(opt);
      });
    }
  };

  addYears = () => {
    // Add years options
    const yearsSelectEl = document.getElementById('cc-card-expiry-year');
    yearsSelectEl.value = '';

    if (yearsSelectEl) {
      // Generate years from current year - 2035
      const years = [];
      const startYear = new Date().getFullYear();
      const endYear = 2035;
      for (let i = startYear; i <= endYear; i++) {
        years.push(i);
      }

      // Add placeholder option
      const opt = this.getPlaceholderOption('Year');
      yearsSelectEl.appendChild(opt);

      years.forEach((y) => {
        const opt = this.getOption(y, y);
        yearsSelectEl.appendChild(opt);
      });
    }
  };

  setUpMonthField = () => {
    const placeholderEl = document.getElementById('card-expiry-month-placeholder');
    const flipEl = new FlipAniEl('card-expiry-month', placeholderEl, 'card-expiry-month', '');

    const selectField = document.getElementById('cc-card-expiry-month');
    selectField.oninput = (e) => {
      const val = e.target.value;
      setFormData(val);
      flipEl.changeValue(val);
    };
  };

  setUpYearField = () => {
    const placeholderEl = document.getElementById('card-expiry-year-placeholder');
    const flipEl = new FlipAniEl('card-expiry-year', placeholderEl, 'card-expiry-year', '');

    const selectField = document.getElementById('cc-card-expiry-year');
    selectField.oninput = (e) => {
      const val = e.target.value;
      setFormData(val);
      flipEl.changeValue(val.slice(2, 4));
    };
  };
}

const setupExpiryDate = () => {
  new ExpiryDate();
};

export default setupExpiryDate;
