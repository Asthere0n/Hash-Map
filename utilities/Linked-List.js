class ListNode {
    constructor(key, value) {
        this.key = key
        this.value = value
        this.next = null
    }

}

class LinkedList {
    constructor(head = null) {
        this.head = head
    }
    size() {
        let count = 0;
        let node = this.head;
        while (node) {
            count++;
            node = node.next
        }
        return count;
    }
    append(value) {
        if (this.head === null) {
            this.head = value
        } else {
            let currentvalue = this.head
            while (currentvalue.next) {
                currentvalue = currentvalue.next
            }
            currentvalue.next = value
        }
    }
}

export { ListNode, LinkedList }