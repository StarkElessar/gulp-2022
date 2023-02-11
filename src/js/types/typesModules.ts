export type TypeCallback = (webpSupport: boolean) => void

export interface EventWithTarget extends MouseEvent {
  target: HTMLElement
}

export interface IsMobile {
  Android: () => RegExpMatchArray | null;
  BlackBerry: () => RegExpMatchArray | null;
  iOS: () => RegExpMatchArray | null;
  Opera: () => RegExpMatchArray | null;
  Windows: () => RegExpMatchArray | null;
  any: () => RegExpMatchArray | null;
}