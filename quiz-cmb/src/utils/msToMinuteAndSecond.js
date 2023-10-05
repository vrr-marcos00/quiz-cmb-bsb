export const msToMinuteAndSecond = (ms) => {
  if (ms > 0) {
    const seconds = (ms / 1000) % 60;
    const minutes = (ms - (ms % 60000)) / 60000;
    return `${minutes >= 10 ? minutes : `0${minutes}`}:${
      seconds >= 10 ? seconds : `0${seconds}`
    }`;
  }

  return "00:00";
};
