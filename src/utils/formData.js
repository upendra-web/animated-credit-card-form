const formData = {
  cardNo: '',
  cardName: '',
  expiryMonth: '',
  expiryYear: '',
  cvv: '',
};

export default {
  getFormData() {
    return formData;
  },
  setFormData(key, value) {
    formData[key] = value;
  },
};
