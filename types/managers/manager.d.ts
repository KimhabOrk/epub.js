import Contents from "../contents";
import Layout from "../layout";
import { EpubCFIPair } from "../mapping";
import Section from "../section";
import View, { ViewSettings } from "./view";

export interface ViewLocation {
  index: number;
  href: string;
  pages: number[];
  totalPages: number;
  mapping: EpubCFIPair;
}

export interface ManagerOptions extends ViewSettings {
  infinite?: boolean;
  overflow?: string;
  [key: string]: any;
}

export default class Manager {
  constructor(options: object);

  applyLayout(layout: Layout): void;
  bounds(): object;
  clear(): void;
  current(): View;
  currentLocation(): ViewLocation[];
  destroy(): void;
  direction(dir: string): void;
  display(section: Section, target: string | number): Promise<void>;
  getContents(): Contents[];
  isRendered(): boolean;
  next(): Promise<void>;
  onOrientationChange(e: Event): void;
  prev(): Promise<void>;
  render(element: Element, size?: { width: Number; height: Number }): void;
  resize(width: Number, height: Number): void;
  setLayout(layout: Layout): void;
  updateAxis(axis: string, forceUpdate: boolean): void;
  updateFlow(flow: string): void;
  updateLayout(): void;
  visible(): View[];

  private createView(section: Section): View;
  private afterDisplayed(view: View): void;
  private afterResized(view: View): void;
  private moveTo(offset: { top: Number; left: Number }): void;
  private append(section: Section): Promise<void>;
  private prepend(section: Section): Promise<void>;
  private scrollBy(x: number, y: number, silent: boolean): void;
  private scrollTo(x: number, y: number, silent: boolean): void;
  private onScroll(): void;
  // Event emitters
  emit(type: any, ...args: any[]): void;
  off(type: any, listener: any): any;
  on(type: any, listener: any): any;
  once(type: any, listener: any, ...args: any[]): any;
}
