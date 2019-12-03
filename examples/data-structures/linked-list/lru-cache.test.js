const LinkedListLRU = require('./lru-cache');

const lruCache = new LinkedListLRU(1, 3);
lruCache.lookup(2);
console.log(lruCache.print());  // 2 -> 1
lruCache.lookup(3);
console.log(lruCache.print());  // 3 -> 2 -> 1
lruCache.lookup(4);
console.log(lruCache.print());  // 4 -> 3 -> 2
lruCache.lookup(2);
console.log(lruCache.print());  // 2 -> 4 -> 3
