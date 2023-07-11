import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframeEl = document.querySelector('iframe');
const player = new Player(iframeEl);

player.on(
  'timeupdate',
  throttle(
    data =>
      localStorage.setItem(
        'videoplayer-current-time',
        JSON.stringify(data.seconds)
      ),
    1000
  )
);

const savedSeconds = localStorage.getItem('videoplayer-current-time');

if (savedSeconds) {
  player.setCurrentTime(JSON.parse(savedSeconds));
}
