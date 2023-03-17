import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  constructor() { }

  getItem(key: string) {
    return localStorage.getItem(key);
  }

  setItem(key: string, value: any) {
    return localStorage.setItem(key, value);
  }

  async deleteItem(key: string) {
    return localStorage.removeItem(key);
  }

  async clearAllItem() {
    return localStorage.clear();
  }
}