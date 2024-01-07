export interface IShortRoom {
  id: number;
  name: string;
}

export interface IRoom extends Omit<IShortRoom, "name"> {
  messages: IMessage[];
  isUpdatedUserIds: number[];
}

export interface IMessage {
  id: number;
  text: string;
  creatorId: number;
  parent: IParent | null;
  viewedIds: number[];
  likes: IUser[];
  creatorAlias: string;
  isRemoved: boolean;
}

export interface IParent {
  id: number;
  alias: string;
}

export interface IEmoji {
  emoji: string;
  name: string;
  skin_tone_support: boolean;
  slug: string;
  unicode_version: string;
  emoji_version: string;
  skin_tone_support_unicode_version?: string;
}

export interface IEmojiCategoty {
  name: string;
  slug: string;
  emojis: IEmoji[];
}

export interface IUser {
  alias: string;
  id: number | null;
}
