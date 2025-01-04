class HashMap {
    constructor(loadFactor, capacity = 16) {
        this.loadFactor = loadFactor,
        this.capacity = capacity
     }

    hash(key) {
        let hashCode = 0
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)%16);
        }
        return hashCode;
    }
    
    set(key, value){

    }
}

export default HashMap