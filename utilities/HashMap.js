import {ListNode, LinkedList} from "../utilities/Linked-List"

class HashMap {
    constructor(loadFactor, capacity = 16) {
        this.loadFactor = loadFactor,
        this.capacity = capacity,
        this.bucketList = new Array(capacity).fill(null).map(() => new LinkedList());
     }

    hash(key) {
        // Generates a hash for a given key 
        let hashCode = 0
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i))%this.capacity;
        }
        return hashCode;
    }

    set(key, value){
        // Introduces a new value in a key bucket, if the key already exists it will overwrite.
        const hashKey = this.hash(key)
        const bucket = this.bucketList[hashKey]
        
        // When hash-key is the same but the keys are different we have a collision, we solve it using a linked list.
        let currentNode = bucket.head
        while(currentNode){
            if (currentNode.key === key){
                currentNode.value = value
                return;
            } else {
                currentNode = currentNode.next
            }
        }
        // If the key doesn't exist yet, add a new node to list
        bucket.append(new ListNode(key, value))
    }


}

export default HashMap