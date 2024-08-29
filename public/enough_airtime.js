function enoughAirtime() {
  return {
      usage: '',
      available: 0,
      result: 0,
      async checkAirtime() {
          const response = await fetch('/api/enough', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ usage: this.usage, available: this.available })
          });
          const data = await response.json();
          this.result = data.result;
      }
  }
}