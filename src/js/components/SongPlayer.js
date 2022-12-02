class SongPlayer {
  constructor(dataId) {
    const thisSongPlayer = this;

    thisSongPlayer.render(dataId);
    thisSongPlayer.initPlugin();
  }

  render(dataId) {
    const thisSongPlayer = this;

    thisSongPlayer.playerId = ('.ready-player-' + dataId);
  }

  initPlugin() {
    const thisSongPlayer = this;

    thisSongPlayer.greenAudioPlayer = new GreenAudioPlayer(thisSongPlayer.playerId, {
      stopOthersOnPlay: true,
    });
  }
}

export default SongPlayer;