function phoneBill() {
  return {
      usage: '',
      total: 0,
      newCallPrice: 2.75,
      newSmsPrice: 0.65,
      updateMessage: '',
      async calculateTotal() {
          const response = await fetch('/api/phonebill/total', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ bill: this.usage })
          });
          const data = await response.json();
          this.total = data.total;
      },
      async updatePrices() {
          let response = await fetch('/api/phonebill/price', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ type: 'call', price: this.newCallPrice })
          });
          let data = await response.json();
          this.updateMessage = data.message;

          response = await fetch('/api/phonebill/price', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ type: 'sms', price: this.newSmsPrice })
          });
          data = await response.json();
          this.updateMessage += ` ${data.message}`;
      }
  }
}