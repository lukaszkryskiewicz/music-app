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
    // eslint-disable-next-line no-undef
    thisSongPlayer.greenAudioPlayer = new GreenAudioPlayer(thisSongPlayer.playerId, {
      stopOthersOnPlay: true,
    });
  }
}

export default SongPlayer;