import { ReactNode } from "react";

export const getNumber = (str: string): number => {
  if (typeof str !== "string") {
    str = String(str);
  }

  const value = str.match(/\d/g)?.join("");

  if (Number.isNaN(Number(value))) {
    return 0;
  }

  return Number(value);
};

export function getRandomInt(min: number = 1, max: number = 5555555): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function setItemLocalStorage(key: string, item: unknown) {
  const value: string = JSON.stringify(item);

  localStorage.setItem(key, value);
}

export const getItemLocalStorage = (key: string): unknown => {
  const value: string | null = localStorage.getItem(key);

  if (value) {
    return JSON.parse(value);
  }

  return null;
};

export const getNodeWithBr = (text: string): ReactNode[] => {
  if (!text?.length) {
    return null;
  }

  const str = text.split("\n");

  return str?.map((elem: string) => (
    <span key={getRandomInt()}>
      {elem}
      <br />
    </span>
  ));
};

export const replaceParagraph = (str: string) => str?.replace(/\n/gi, "");

export const isEmptyStr = (str: string) =>
  str?.replace(/ /gi, "")?.replace(/\n/gi, "")?.length < 1;
