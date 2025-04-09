import { LinkedList } from "./linkedList.js";
class HashMap {
    constructor () {
        this.loadFactor = 0.75 // a number that we assign our hash map to at the start. 
                        //It’s the factor that will determine when it is a good time to grow our buckets array. 
                        // Hash map implementations across various languages use a load factor between 0.75 and 1.
        this.capacity = 16 //total number of buckets currently
        this.buckets = new Array(this.capacity).fill(null).map(() => new LinkedList())
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

    set(key,value) {
        let bucket = this.hash(key)
        let currentNode = this.buckets[bucket].updateNode(key)
        if(currentNode) {
            currentNode.value = value
        } else {
            this.buckets[bucket].append(key,value)
        }
    }

    //takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return null.
    get(key) {
        let bucket = this.hash(key)
        return this.buckets[bucket].getValue(key)
    }
}

let h = new HashMap()

h.set('zaramamalamanana', 4)
console.log(h.buckets)
h.set('zaramamalamanana', 5)
console.log(h.buckets)
h.set('bingbong', 'bongbing')
console.log(h.buckets)
console.log(h.get('bingbong'))