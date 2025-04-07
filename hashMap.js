class HashMap {
    constructor () {
        this.loadFactor = 0.75 // a number that we assign our hash map to at the start. 
                        //It’s the factor that will determine when it is a good time to grow our buckets array. 
                        // Hash map implementations across various languages use a load factor between 0.75 and 1.
        this.capacity = 16 //total number of buckets currently
        this.buckets = new Array(this.capacity)
    }
    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        if(typeof key !== 'string') {
            console.log('key must be a string')
        }
        for(let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }
}

let h = new HashMap()

console.log(h.hash('zaramamalamanana'))
console.log(h.buckets[1])