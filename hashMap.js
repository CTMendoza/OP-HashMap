import { LinkedList } from "./linkedList.js";
class HashMap {
    constructor () {
        this.loadFactor = 0.75 // a number that we assign our hash map to at the start. 
                        //It’s the factor that will determine when it is a good time to grow our buckets array. 
                        // Hash map implementations across various languages use a load factor between 0.75 and 1.
        this.capacity = 16 //total number of buckets currently
        this.buckets = new Array(this.capacity).fill(null).map(() => new LinkedList())
        this.count = 0
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
        let bucket = this.hash(key);
        let currentNode = this.buckets[bucket].updateNode(key);

        if (currentNode) {
        // key exists, just update the value
        currentNode.value = value;
        }   else {
        // new key being added
        this.buckets[bucket].append(key, value);
        this.count++; // 👈 increment the count

        // Check load factor AFTER adding
        if (this.count / this.capacity > this.loadFactor) {
            this._resize();
        }
    }
  }


    //takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return null.
    get(key) {
        let bucket = this.hash(key)
        return this.buckets[bucket].getValue(key)
    }

    //  takes a key as an argument and returns true or false based on whether or not the key is in the hash map.
    has(key) {
        let bucket = this.hash(key)
        return this.buckets[bucket].contains(key)
    }

    // takes a key as an argument. If the given key is in the hash map,
    //  it should remove the entry with that key and return true. 
    // If the key isn’t in the hash map, it should return false.
    remove(key) {
        let bucket = this.hash(key)
        let currentNode = this.buckets[bucket].head
        let previous
        if(currentNode === null) {
            return false
        }

        while(currentNode !== null) {

            if(currentNode.key === key) {
                if(previous === undefined) {
                    this.buckets[bucket].head = currentNode.nextNode
                } else {
                    previous.nextNode = currentNode.nextNode
                }
                this.count--;
                return true
            }
            previous = currentNode
            currentNode = currentNode.nextNode
        }
    }

    //returns the number of stored keys in the hash map.
    length() {
        let count = 0
        for(let i = 0; i < this.buckets.length ; i++) {
            count += this.buckets[i].size()
        }
        return this.count
    }
    //  removes all entries in the hash map.
    clear() {
        for(let i = 0; i < this.buckets.length ; i++) {
            this.buckets[i].head = null
        }
    }
    //  returns an array containing all the keys inside the hash map.
    keys() {
        let keyArray = []
        for(let i = 0; i < this.buckets.length ; i++) {
            keyArray = keyArray.concat(this.buckets[i].getKeys())
        }
        return keyArray
    }
    //returns an array containing all the values.
    values() {
        let valueArray = []
        for(let i = 0; i < this.buckets.length; i++) {
            valueArray = valueArray.concat(this.buckets[i].getValues())
        }
        return valueArray
    }

    //returns an array that contains each key, value pair. Example: [[firstKey, firstValue], [secondKey, secondValue]]
    entries() {
        let pairsArray = []
        for(let i = 0; i < this.buckets.length; i++) {
            pairsArray = pairsArray.concat(this.buckets[i].getKeyValuePair())
        }
        return pairsArray
    }

    _resize() {
        console.log("Resizing triggered!")
        let currentKPPairs = this.entries()
        //Temporarily store the current key value pairs before replacing buckets.
        this.capacity *= 2
        console.log("New capacity after doubling:", this.capacity);
        this.buckets = new Array(this.capacity).fill(null).map(() => new LinkedList())

        for(let i = 0; i < currentKPPairs.length ; i++) {
            let pair = currentKPPairs[i];
            let bucket = this.hash(pair.key); // Rehash the key for new capacity
            this.buckets[bucket].append(pair.key, pair.value);
        }
    }
}

let h = new HashMap()


h.set('apple', 'red')
h.set('banana', 'yellow')
h.set('carrot', 'orange')
h.set('dog', 'brown')
h.set('elephant', 'gray')
h.set('frog', 'green')
h.set('grape', 'purple')
h.set('hat', 'black')
h.set('ice cream', 'white')
h.set('jacket', 'blue')
h.set('kite', 'pink')
h.set('lion', 'golden')
h.set('monkey', 'brown')
console.log(h.length())
console.log("New capacity:", h.capacity); // Should be doubled from 16 to 32




