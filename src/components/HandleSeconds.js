const handleSeconds = (sec) => {
  let minutes = Math.floor(sec / 60);
  let seconds = sec - minutes * 60;

  let minutes_in_string = minutes < 10 ? `0${minutes}` : `${minutes}`;
  let seconds_in_string = seconds < 10 ? `0${seconds}` : `${seconds}`;

  let answer = sec == 0 ? '' : `${minutes_in_string}:${seconds_in_string} min`;

  return answer;
};

export default handleSeconds;
