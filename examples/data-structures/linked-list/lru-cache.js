/**
 * @summary 基于链表实现 LRU 缓存淘汰算法
 * 实现思路
 *      维护一个有序的单链表，越靠近链表尾部的元素是最先访问的，当有新的数据被访问时，从头开始遍历链表
 *      1. 如果数据之前已经被在缓存在链表中，则遍历得到该元素的结点，将其删除，然后插入到链表的头部。
 *      2. 如果数据不在链表的缓存之中，分为两种情况：
 *          - 如果缓存未满，则直接在链表的头部插入
 *          - 如果链表已满，则删除尾部结点，再在链表头部插入
 */

/**
 * 单链表结点类
 */
class LinkedListNode {
    /**
     * @param {T} data 链表结点所存储的数据
     * @param {T} next 链表当前结点的后继结点 默认为 null
     */
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }

    /**
     * 输出当前结点中的数据
     * @param {fn} stringifyFn 自定义 toString 函数
     */
    toString(stringifyFn = undefined) {
        return stringifyFn ? stringifyFn(this.data) : `${this.data}`;
    }
}
/**
 * 基于单链表的 LRU Cache
 */
class LinkedListLRU {
    /**
     * @param {LinkedListNode} head 头结点
     * @param {LinkedListNode} tail 尾结点
     * @param {number} capacity LRU 的缓存大小，默认大小等于10
     * @param {number} length 当前链表结点的个数
     */
    constructor(headData, capacity = 10) {
        this.head = new LinkedListNode(headData);
        this.tail = this.head;
        this.capacity = capacity;
        this.length = 1;
    }

    /**
     * 查询缓存是否有该元素
     * @param {*} value
     */
    lookup(value) {
        let node = this.find({ value });
        // 链表中存在，删除原来的结点，并在链表头部插入
        if (node) {
            this.remove(value);
            this.prepend(value);
        } else {
            if (this.length >= this.capacity) {
                // 删除尾结点
                this.remove(this.tail.data);
            }
            // 在链表头部插入结点
            this.prepend(value);
        }
    }

    /**
     * 查找结点
     * @param {Object} findParams 查找参数中 value 和 callback 二选一即可
     * @param {T} findParams.value 按给定的值查找结点（针对结点存储的数据 data 是值类型的情况）
     * @param {Function} findParams.callback 按给定的 callback 查找结点（针对结点存储的数据 data 是引用类型的情况）
     * @returns {LinkedListNode} Node
     */
    find({ value = undefined, callback = undefined }) {
        if (!this.head) return null;

        let currentNode = this.head;
        while (currentNode) {
            // 如果定义了 callback 函数，按照 callback 函数 查找元素
            if (callback && callback(currentNode.data)) {
                return currentNode;
            }

            // 如果定义了 value，按照值来查找
            if (value && currentNode.data == value) {
                return currentNode;
            }
            currentNode = currentNode.next;
        }
        return null;
    }

    /**
     * 查找前驱结点
     * @param {Object} findParams 查找参数中 value 和 callback 二选一即可
     * @param {T} findParams.value 按给定的值查找对应结点的前驱结点（针对结点存储的数据 data 是值类型的情况）
     * @param {Function} findParams.callback 按给定的 callback 查找对应结点的前驱结点（针对结点存储的数据 data 是引用类型的情况）
     * @returns {LinkedListNode} Node
     */
    findPrev({ value = undefined, callback = undefined }) {
        if (!this.head) return null;

        let currentNode = this.head;
        while (currentNode && currentNode.next) {
            if (callback && callback(currentNode.next.data)) {
                return currentNode;
            }
            if (value && value == currentNode.next.data) {
                return currentNode;
            }
            currentNode = currentNode.next;
        }
        return null;
    }

    /**
     * 在链表的头部插入元素
     * @param {T} value
     */
    prepend(value) {
        // 创建新结点，且新结点的 next 指向当前的 head 的结点
        const newNode = new LinkedListNode(value, this.head);
        this.head = newNode; // 将头结点指向新创建的结点
        this.length++;
    }

    /**
     * 在链表中删除数据为 value 的结点
     * @param {T} value
     */
    remove(value) {
        let deleteNode = this.find({ value });
        if (deleteNode) {
            let deleteNodePrev = this.findPrev({ value });

            // 删除的元素结点是 head
            if (deleteNode === this.head) this.head = deleteNode.next;

            // 删除的元素结点是 tail
            if (deleteNode === this.tail) this.tail = deleteNodePrev;

            // 删除的是中间结点
            if (deleteNodePrev) {
                deleteNodePrev.next = deleteNode.next;
            }
            this.length--;
        }
    }

    print(toStringFn = undefined) {
        let res = [];
        let currentNode = this.head;
        while (currentNode) {
            res.push(currentNode.toString(toStringFn));
            currentNode = currentNode.next;
        }
        return res.join(' -> ');
    }
}

module.exports = LinkedListLRU;
