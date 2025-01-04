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
    has(key){
        // If there's an entrance with that key returns true, otherwise false
        const hashKey = this.hash(key)
        if (this.bucketList[hashKey].key === key ){
            return true
        } else {
            return false
        }
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

        // We need to check if the Hashmap in over capacity and make it grow
        this.grow()
    }
    length(){
        let size = 0
        this.bucketList.forEach(bucket => {
            let currentNode = bucket.head
            while (currentNode){
                size++
                currentNode = currentNode.next
            }
        })
        return size
    }
    grow(){
        if (this.length() > this.loadFactor * this.capacity){
            const oldBucketList = this.bucketList
            this.capacity *= 2
            this.bucketList = new Array(capacity).fill(null).map(() => new LinkedList());

            oldBucketList.forEach(bucket => {
                let currentNode = bucket.head
                while (currentNode){
                    this.set(currentNode.key, currentNode.value)
                    currentNode = currentNode.next
                }
            })
        }
    }
    remove(key){
        if (this.has(key)){
            const hashKey = this.hash(key)
            const bucket = this.bucketList[hashKey]

            if (bucket.head.key === key){
                bucket.head = bucket.head.next
            } else {
                let currentNode = bucket.head
                while(currentNode.next){
                    if (currentNode.next.key === key){
                        currentNode.next = currentNode.next.next
                        return true
                    } 
                    currentNode = currentNode.next
                }
            }
            return true
        } else {
            return false
        }
    }
    clear(){
        // Resets the Hashmap to an empty set of linked lists
        this.bucketList = new Array(this.capacity).fill(null).map(() => new LinkedList());
    }
    keys(){
        // Returns an array with all the keys in the hashmap
        let keys = []
        this.bucketList.forEach(bucket=>{
            let currentNode = bucket.head
            while(currentNode){
                keys.push(currentNode.key)
                currentNode = currentNode.next
            }
        })
        return keys
    }
    values(){
        // Returns an array with all the values in the hashmap
        let values = []
        this.bucketList.forEach(bucket => {
            let currentNode = bucket.head
            while (currentNode){
                values.push(currentNode.value)
                currentNode = currentNode.next
            }
        });
        return values
    }
    entries(){
        // Returns an array that contains an array containing the key and value of each entry
        let entries = []
        this.bucketList.forEach(bucket=>{
            let currentNode = bucket.head
            while (currentNode){
                entries.push([currentNode.key, currentNode.value])
                currentNode = currentNode.next
            }
        })
        return entries
    }
}

export default HashMap