import { select } from '../settings.js';

class SongPlayer {
  constructor(sectionId, dataId) {
    const thisSongPlayer = this;

    thisSongPlayer.render(sectionId, dataId);
    thisSongPlayer.initPlugin();
    thisSongPlayer.stopOtherOnClick();
  }

  render(sectionId, dataId) {
    const thisSongPlayer = this;

    thisSongPlayer.playerId = (sectionId + ' ' + select.player.ready + dataId);
  }

  initPlugin() {
    const thisSongPlayer = this;
    // eslint-disable-next-line no-undef
    thisSongPlayer.greenAudioPlayer = new GreenAudioPlayer(thisSongPlayer.playerId, {
      stopOthersOnPlay: true,
    });


  }

  stopOtherOnClick() {
    const thisSongPlayer = this;

    thisSongPlayer.players = document.querySelectorAll('.songs');
    for (const player of thisSongPlayer.players) {
      const playButton = player.querySelector('audio');
      playButton.addEventListener('play', function () {
        const players = document.querySelectorAll('.green-audio-player audio');
        const cb = function (event) {
          if (!((event.target.parentElement.classList.contains('play-pause-btn')) || (event.target.classList.contains('play-pause-btn__icon')))) {
            for (let i = 0; i < players.length; i++) {
              // eslint-disable-next-line no-undef
              GreenAudioPlayer.pausePlayer(players[i]);
            }
            window.removeEventListener('click', cb);
          }
        };

        window.addEventListener('click', cb);
      });
    }
  }
}

export default SongPlayer;