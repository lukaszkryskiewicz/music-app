class SongPlayer {
  constructor(sectionId, dataId) {
    const thisSongPlayer = this;

    thisSongPlayer.render(sectionId, dataId);
    thisSongPlayer.initPlugin();
  }

  render(sectionId, dataId) {
    const thisSongPlayer = this;

    thisSongPlayer.playerId = (sectionId + ' .ready-player-' + dataId);
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