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
        let previousNode 
        if(currentNode === null) {
            return false
        }

        while(currentNode !== null) {

            if(currentNode.key === key) {
                if(previousNode === undefined) {
                    this.buckets[bucket].head = currentNode.nextNode
                } else {
                    previousNode.nextNode = currentNode.nextNode
                }
                return true
            }
            previousNode = currentNode
            currentNode = currentNode.nextNode
        }
        // return currentNode
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
console.log(JSON.stringify(h.buckets, null, 2))
h.remove("hat");
console.log(JSON.stringify(h.buckets, null, 2))
console.log(h.get("hat"))



