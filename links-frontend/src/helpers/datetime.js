export const secondsToReadableTime = (seconds) => {
    const h = Math.floor(seconds / 60 / 60);
    const m = Math.floor(seconds / 60) - h * 60;
    const s = seconds % 60;
    const formtNumber = (v) => `0${Number.parseInt(v, 10)}`.slice(-2);
    const readableTime = [h,m,s].map(formtNumber).join(':');

    return readableTime;

};

