function wordGame() {
  return {
      sentence: '',
      stats: null,
      async fetchStats() {
          if (this.sentence.length === 0) {
              this.stats = null;
              return;
          }
          const response = await fetch(`/api/word_game?sentence=${encodeURIComponent(this.sentence)}`);
          this.stats = await response.json();
      }
  }
}