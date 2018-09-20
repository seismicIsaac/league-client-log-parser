class Signal {
  constructor() {
    this.listeners = [];
  }
  
  add(listener)  {
    this.listeners.push(listener);
  }

  remove(listener) {
    if (this.listeners.includes(listener)) {
      this.listeners.remove(listener);
    }
  }

  dispatch() {
    this.listeners.forEach((listener) => {
      listener.call();
    });
  }

  removeAll() {
    this.listeners = [];
  }
}

export { Signal };