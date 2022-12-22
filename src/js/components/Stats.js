class Stats {
  constructor(globalObj) {

    this.global = globalObj;
    this.global.listenedSongsCatObj = {};
    this.global.listenedSongsCounter = 0;
    this.global.playedSongId = null;

  }

  playedSongIdCheck(player) {
    if (this.global.playedSongId !== player.className.slice(-1)) {
      this.global.playedSongId = player.className.slice(-1);
      const playedSongCategories = this.global.songList[this.global.playedSongId - 1].categories;
      this.playedSongCategories(playedSongCategories);
      this.playedSongsCounter();
    }
  }

  playedSongCategories(song) {
    for (let songCategory of song) {
      if (typeof this.global.listenedSongsCatObj[songCategory] == 'undefined') {
        this.global.listenedSongsCatObj[songCategory] = 1;
      } else this.global.listenedSongsCatObj[songCategory]++;
    }
  }

  playedSongsCounter() {
    this.global.listenedSongsCounter++;
  }

  categoriesToDraw() {
    let max = 0;
    this.global.categoriesToDrawArray = [];
    for (let songCategory in this.global.listenedSongsCatObj) {
      if (max < this.global.listenedSongsCatObj[songCategory]) {
        this.global.categoriesToDrawArray = [];
        this.global.categoriesToDrawArray.push(songCategory);
        max = this.global.listenedSongsCatObj[songCategory];
      } else if (max == this.global.listenedSongsCatObj[songCategory]) {
        this.global.categoriesToDrawArray.push(songCategory);

      }

    }
  }

  songsToDraw() {
    this.global.songToDrawArray = [];
    for (let song of this.global.songList) {
      for (let category of this.global.categoriesToDrawArray) {
        if (song.categories.indexOf(category) != -1) {
          if (this.global.songToDrawArray.indexOf(song) == -1) {
            this.global.songToDrawArray.push(song);
          }

        }
      }
    }
  }
}


export default Stats;