import { Injectable, Provider, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

interface IStorage {
  setItem<T>(key: string, item: T): void;
  getItem<T>(key: string, item: T): T;
}

export class StorageService implements IStorage {
  setItem<T>(key, item): T {
    return item;
  }
  getItem<T>(key): T {
    return null;
    //todo:??? null  getter???
  }
}

export function storageFactory(platformId: string): any {
  if (isPlatformBrowser(platformId)) {
    return new BrowserStorage();
  }
  if (isPlatformServer(platformId)) {
    return new ServerStorage();
  }
  throw new Error("No implementation for this platform: " + platformId);
}

export const storageServiceProvider: Provider = {
  provide: StorageService,
  useFactory: storageFactory,
  deps: [PLATFORM_ID]
};

@Injectable()
export class BrowserStorage {
  localStorage = localStorage;

  setItem<T>(key: string, item: T): void {
    const str = typeof item === 'string' ? item : JSON.stringify(item);
    this.localStorage.setItem(key, str);
  }

  getItem<T>(key: string): T {
    let item;
    const temp = this.localStorage.getItem(key);
    if (!temp) { return null; }
    try {
      item = JSON.parse(temp);
    } catch {
      item = temp;
    }
    return item;
  }

}

export class ServerStorage {
  localStorage = {
    data: {},
    setItem<T>(key: string, item: T): void {
      this.data[key] = item;
    },
    getItem<T>(key: string): T {
      return this.data[key] || null;
    }
  }

  setItem<T>(key: string, item: T): void {
    this.localStorage.setItem(key, JSON.stringify(item));
  }

  getItem<T>(key: string): T {
    let item;
    const temp = this.localStorage.getItem(key) as any;
    if (!temp) { return null; }
    try {
      item = JSON.parse(temp);
    } catch {
      item = temp;
    }
    return item;
  }
}

