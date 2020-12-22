class PubSub {
  constructor() {
    // 维护事件及监听者
    this.events = {};
  }

  // 注册事件订阅行为
  subscribe(type, cb) {
    if (!this.events[type]) {
      this.events[type] = [];
    }
    this.events[type].push(cb);
  }

  // 发布事件
  publish(type, ...args) {
    this.events[type] && this.events[type].forEach((cb) => cb(...args));
  }

  // 移除某个事件的一个订阅行为
  unsubscribe(type, cb) {
    if (this.events[type]) {
      let index = this.events[type].findIndex((item) => item === cb);
      if (index > -1) {
        this.events[type].splice(index, 1);
      }
      if (this.events[type].length === 0) {
        delete this.events[type];
      }
    }
  }

  // 移除某个事件的所有订阅行为
  unsubscribeAll(type) {
    if (this.events[type]) {
      delete this.events[type];
    }
  }
}

const ps = new PubSub()
ps.subscribe('test', () => {
    console.log('ssss')
})
ps.subscribe('test', () => {
    console.log('fsdfsdfd')
})
ps.publish('test')