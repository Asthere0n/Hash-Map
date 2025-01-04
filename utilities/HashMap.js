class HashMap {
    constructor(loadFactor, capacity = 16) {
        this.loadFactor = loadFactor,
        this.capacity = capacity,
        this.bucketList = []
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
        const newBucket = {head: {key : value}}
        
        // When hash-key is the same but the keys are different we have a collision, we solve it using a linked list.
        if (this.bucketList[hashKey] == undefined || this.bucketList[hashKey][0] === key){
            this.bucketList[hashKey] = newBucket
        } else {
            this.bucketList[hashKey][2] = key
            this.bucketList[hashKey].push(newBucket)
        }
    }
}

export default HashMap