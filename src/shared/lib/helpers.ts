const numberFormatter = new Intl.NumberFormat("ru-RU");

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getRandomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1) + min);

export const formatNumber = (value: number): string => numberFormatter.format(value);
