import { Component } from '@nestjs/common';

@Component()
export class ConfigService {
  private items: {[key: string]: any} = {};

  has(key: string): boolean {
    return key in this.items;
  }

  get(key: string, defaultValue: any = null): any {
    if (this.has(key)) {
      return this.items[key];
    }

    return defaultValue;
  }

  set(key: string, value: any) {
    this.items[key] = value;
  }
}