import { ROOMS, initialRooms } from "lib/constants/rooms";
import { getRandomInt, setItemLocalStorage } from "lib/helpers";
import { addMessage, getRoom, getRooms, updateMessage } from ".";
import { IMessage } from "models/models";

describe("Получить комнаты из localstorage", () => {
  localStorage.clear = jest.fn();

  test("Получить загруженный список", () => {
    setItemLocalStorage(ROOMS, initialRooms);
    expect(getRooms()).toEqual(initialRooms);
  });

  test("Нет rooms в localstorage", () => {
    localStorage.clear();
    expect(getRooms()).toEqual([]);
    expect(getRooms()).not.toBeNull();
  });
});

describe("getRoom", () => {
  localStorage.clear = jest.fn();

  test("Получить комнату, если есть список", () => {
    setItemLocalStorage(ROOMS, initialRooms);
    const room = initialRooms[getRandomInt(0, initialRooms.length - 1)];
    expect(getRoom(room.id)).toEqual({ id: room.id, messages: [] });
  });

  test("Получить комнату, если нет id в списке", () => {
    setItemLocalStorage(ROOMS, initialRooms);
    expect(getRoom(initialRooms.length + 1)).toBeNull();
  });

  test("Нет rooms в localstorage", () => {
    localStorage.clear();
    expect(getRooms()).toEqual([]);
    expect(getRooms()).not.toBeNull();
    expect(getRooms()).not.toBeUndefined();
  });
});

describe("addMessage", () => {
  const message: IMessage = {
    creatorAlias: "1",
    creatorId: 1,
    id: 2,
    likes: [],
    parent: null,
    text: "text",
    viewedIds: [],
    isRemoved: false,
  };

  const room = initialRooms[getRandomInt(0, initialRooms.length - 1)];

  beforeEach(() => {
    setItemLocalStorage(ROOMS, initialRooms);
    addMessage(room.id, [], message);
  });

  test("Добавить сообщение в localstorage", () => {
    const newMessages = getRoom(room.id)?.messages;
    expect(newMessages).toContainEqual(message);
    expect(newMessages).not.toEqual([]);
  });
});

describe("updateMessage", () => {
  const initialMessage: IMessage = {
    creatorAlias: "1",
    creatorId: 1,
    id: 2,
    likes: [],
    parent: null,
    text: "text",
    viewedIds: [],
    isRemoved: false,
  };

  const newMessage = {
    ...initialMessage,
    likes: [{ id: 1, alias: "alias" }],
  };

  const room = initialRooms[getRandomInt(0, initialRooms.length - 1)];

  beforeEach(() => {
    setItemLocalStorage(ROOMS, initialRooms);
    addMessage(room.id, [], initialMessage);
    updateMessage(room.id, [initialMessage], newMessage);
  });

  test("Обновить сообщение в localstorage", () => {
    const newMessages = getRoom(room.id)?.messages;
    expect(newMessages).toContainEqual(newMessage);
    expect(newMessages).not.toContainEqual(initialMessage);
    expect(newMessages).not.toEqual([]);
  });
});
