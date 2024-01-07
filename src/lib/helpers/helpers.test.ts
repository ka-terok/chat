import {
  getNumber,
  getRandomInt,
  setItemLocalStorage,
  getItemLocalStorage,
  replaceParagraph,
  isEmptyStr,
} from ".";

describe("getNumber", () => {
  test("Корректное значение", () => {
    expect(getNumber("50")).toBe(50);
  });

  test("Пустая строка", () => {
    expect(getNumber("")).toBe(0);
  });

  test("Рандомный текст вернет 0", () => {
    expect(getNumber("kkdlasd")).toBe(0);
  });

  test("Рандомный текст не вернет undefined", () => {
    expect(getNumber("kkdlasd")).not.toBeUndefined();
  });
});

describe("getRandomInt", () => {
  test("Получить рандомное число", () => {
    expect(getRandomInt()).not.toBeUndefined();
    expect(getRandomInt()).not.toBeNaN();
  });

  test("Получить рандомное число от 1 до 6", () => {
    expect(getRandomInt(1, 6)).toBeGreaterThanOrEqual(1);
    expect(getRandomInt(1, 6)).toBeLessThan(6);
    expect(getRandomInt()).not.toBeNaN();
  });

  test("Получить рандомное число от 1 до 6 не больше не меньше", () => {
    expect(getRandomInt(1, 6)).not.toBeGreaterThanOrEqual(7);
    expect(getRandomInt(1, 6)).not.toBeLessThan(0);
  });
});

describe("setItemLocalStorage", () => {
  test("Разместить информацию localstorage", () => {
    localStorage.getItem = jest.fn();
    const str = "item";

    const obj = JSON.stringify(str);

    setItemLocalStorage("item", str);

    expect(localStorage.getItem("item")).toEqual(obj);
    expect(localStorage.getItem("item")).not.toBeNull();
  });
});

describe("getItemLocalStorage", () => {
  test("Получить строку", () => {
    const str = "item";
    setItemLocalStorage("item", str);
    expect(getItemLocalStorage("item")).not.toBeNull();
    expect(getItemLocalStorage("item")).toBe(str);
  });

  test("Получить пустую строку", () => {
    const str = "";
    setItemLocalStorage("item", str);
    expect(getItemLocalStorage("item")).toBe(str);
  });

  test("Получить number", () => {
    const str = 4;
    setItemLocalStorage("item", str);
    expect(getItemLocalStorage("item")).toBe(str);
    expect(getItemLocalStorage("item")).not.toBe("4");
  });

  test("Получить объект", () => {
    const obj = {
      a: 1,
    };
    setItemLocalStorage("item", obj);
    expect(getItemLocalStorage("item")).not.toBeNull();
    expect(getItemLocalStorage("item")).toEqual(obj);
  });

  test("Запросить значение, которое не записано", () => {
    expect(getItemLocalStorage("empty")).toBeNull();
  });

  test("Получить массив", () => {
    const array = [
      {
        a: 1,
      },
      { b: 1 },
    ];

    const array2 = {
      a: 1,
      b: 1,
    };

    setItemLocalStorage("item", array);

    expect(getItemLocalStorage("item")).toEqual(array);
    expect(getItemLocalStorage("item")).not.toEqual(array2);
    expect(getItemLocalStorage("item")).not.toBeNull();
  });
});

describe("replaceParagraph", () => {
  test("Пустая строка", () => {
    const str = "";
    expect(replaceParagraph(str)).toBe(str);
  });

  test("Один абзац", () => {
    const str = "new\nstring";
    const newStr = "newstring";
    expect(replaceParagraph(str)).toBe(newStr);
  });

  test("Два абзац", () => {
    const str = "new\nstring\ntest";
    const newStr = "newstringtest";
    const failedStr = "newstring\ntest";
    expect(replaceParagraph(str)).toBe(newStr);
    expect(replaceParagraph(str)).not.toBe(failedStr);
  });
});

describe("isEmptyStr", () => {
  test("Пустая строка", () => {
    const str = "";
    expect(isEmptyStr(str)).toBe(true);
  });

  test("Один пробел", () => {
    const str = " ";
    expect(isEmptyStr(str)).toBe(true);
  });

  test("Два пробела", () => {
    const str = "  ";
    expect(isEmptyStr(str)).toBe(true);
    expect(isEmptyStr(str)).not.toBe(false);
  });

  test("Пробелы с текстом", () => {
    const str = "вввв ";
    expect(isEmptyStr(str)).toBe(false);
    expect(isEmptyStr(str)).not.toBe(true);
  });

  test("С абзацем", () => {
    const str = "\n";
    expect(isEmptyStr(str)).toBe(true);
    expect(isEmptyStr(str)).not.toBe(false);
  });

  test("С 2 абзацами", () => {
    const str = "\n\n";
    expect(isEmptyStr(str)).toBe(true);
    expect(isEmptyStr(str)).not.toBe(false);
  });

  test("С 2 абзацами и пробелами", () => {
    const str = "   \n\n";
    expect(isEmptyStr(str)).toBe(true);
    expect(isEmptyStr(str)).not.toBe(false);
  });

  test("С 2 абзацами и пробелами и текстом", () => {
    const str = "  в \n\n";
    expect(isEmptyStr(str)).toBe(false);
    expect(isEmptyStr(str)).not.toBe(true);
  });
});
