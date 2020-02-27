'use strict';
/**
 * A dictionary/hash map data structure for storing key/value pairs. Finding
 * an entry in a hash table takes O(1) constant time(same for 10 as 1 billion
 * items). Whereas finding an item via binary search takes time proportional
 * to the logarithm of the item in  the list O(logn). Finding an item in a
 * regular old list takes time proportional to the length of the list O(n).
 * Very slow. Hash Tables = very fast
*/
class HashTable {
   private _buckets: Array<Map<any, any>>
   private _numOfBuckets: number
   private _originalSize: number
   private _size: number

   public length: number

   constructor(s: number = 11) {
      this._buckets = new Array(s);
      this._numOfBuckets = 0;
      this._originalSize = s;
      this._size = s;
      this.length = 0;
   };

   /**
    * The Iterator method for the HashTable, allowing the table to be looped over if needed,
    * along with allowing the spread operator to work on it. O(n) with n being length of the
    * hashTable, NOT necessarily the size of the hashTable
   */
   *[Symbol.iterator]() {
      // Loop over the buckets
      for (let i = 0; i < this._buckets.length; i++) {
         // If the bucket exists
         if (this._buckets[i] !== undefined) {
            // Loop over the map
            for (let tuple of this._buckets[i]) {
               // Yield each tuple in the map
               yield tuple
            }
         };
      };
   };

   /**
    * Hash is a method that converts any key such as 'alex', 'best hotels', 'google' etc..
    * and converts it into a 'seemingly' random number. This number will be our hash key.
    * It's not really random since it will always be the same for any particular key.
    * Sort of like an encrypted version of our hash key that we will later decrypt when
    * we need to retrieve the desired key. Note that the number output by this function
    * cannot be any larger than the size of our hash table. See the size value we set above.
    * 
    * @param {any} key The non-hashed value provided by the user, can be any type
    * @return {number} The hashed index from running method on the given key
   */
   _hash(key: any): number {
      // Does not allow keys or values to be undefined or have a length of 0
      if (key === undefined || key.length === 0) {
         throw ('Key cannot be undefined');
      };

      let i: number;
      let length: number = key.length - 3;
      let t0: number = 0;
      let t1: number = 0;
      let v0: number = 0x9dc5;
      let v1: number = 0x811c;

      for (i = 0; i < length; i++) {
         v0 ^= key.toString().charCodeAt();
         t0 = v0 * 403;
         t1 = v1 * 403;
         t1 += v0 << 8;
         v1 = (t1 + (t0 >>> 16)) & 65535;
         v0 = t0 & 65535;
      };

      while (i < length + 3) {
         v0 ^= key.toString().charCodeAt(i++);
         t0 = v0 * 403;
         t1 = v1 * 403;
         t1 += v0 << 8;
         v1 = (t1 + (t0 >>> 16)) & 65535;
         v0 = t0 & 65535;
      };

      return (((v1 << 16) >>> 0) + v0) % this._size
   };

   /**
    * doubleHash is a method that is a second simpler hashing function used in tandem with the
    * original hash method. This makes it to where, if there is a collision, i is increased and
    * doubleHash is used to look for a open bucket.
    * 
    * @param {any} key The non-hashed value provided by the user, can be any type
    * @return {number} The hashed index from running method on the given key
    */
   _doubleHash(key: any): number {
      // Helper function used to check if a number is Prime
      const isPrime = (num: number): boolean => {
         for (let i = 2, s = Math.sqrt(num); i <= s; i++)
            if (num % i === 0) return false;
         return num > 1;
      };

      let PRIME: number = this._size - 1;
      let hash: number = 0;

      while (!isPrime(PRIME)) {
         PRIME--;
      };

      for (let i: number = 0; i < key.length; i++) {
         // hash << 5 transalets to: hash * (2 ** 5)
         hash = (hash << 5) - hash + key.toString().charCodeAt(i);
         // Convert to 32bit unsigned integer
         hash = hash >>> 0;
      };

      return PRIME - Math.abs(hash % PRIME);
   };

   /**
    * The set method will call the hash method to encrypt our insertion key and insert its
    * value at this specified index in our storage array (any index from 0 to size) By using
    * a Map as our buckets, we get the benifit of being able to handle hash collisions while
    * still maintaining 0(1) constant time retrieval of any key and value in the Map
    * 
    * @param {any} key The non-hashed value provided by the user, can be any type
    * @param {any} value The value stored at the given key, can be any type
    * @return {number} The index of the Hash Table where the key/value pair is stored
   */
   set(key: any, value: any): number {
      // Does not allow keys or values to be undefined or have a length of 0
      switch (value && key) {
         case '':
            throw new TypeError('Key or Value cannot be an empty string');
            break;
         case undefined:
            throw new TypeError('Key or Value cannot be undefined');
            break;
      };

      let i: number = 0;

      // Because the result of doubleHash is multiplied by i, which starts at zero, the value of
      // doubleHash is only used if there is a collision
      let hashedIndex: number = this._hash(key) + (i * this._doubleHash(key));

      // While i and the hashedIndex are less than or equal to the size of the Hash Table and while
      // the hashedIndex is already an exisiting bucket
      while (i <= this._size && hashedIndex <= this._size && this._buckets[hashedIndex]) {
         hashedIndex = this._hash(key) + (i++ * this._doubleHash(key)); //?

         // If the hashedIndex in the buckets array is a Map and if the map has the given key
         if (this._buckets[hashedIndex] && this._buckets[hashedIndex].has(key)) {
            // Break out of the while loop
            break;
         };
      };

      // If the bucket is empty at this hashedIndex
      if (!this._buckets[hashedIndex]) {
         // Create a bucket
         this._buckets[hashedIndex] = new Map();
         this._numOfBuckets++;
      };

      // If the hashedIndex in the buckets array is a Map and the Map does NOT have the given key
      if (!this._buckets[hashedIndex].has(key)) {
         // Increase the length because it is a new inserction
         this.length++;
      };

      // Add key value pair to the bucket
      this._buckets[hashedIndex].set(key, value);

      // Resize the buckets array if the buckets array is 70% full
      if (this._numOfBuckets > ~~(this._size * 0.70)) {
         this._resize('increase');
      };

      return hashedIndex
   };

   /**
    * The get method will call the hash method again, this time to decrypt our key(in a way).
    * Since it knows the exact index of retrieval in our storage array, we are able to bypass
    * the need to search through the array, resulting in an almost instantaneous O(1) constant
    * time retrieval of any key and value in our hash, even if more then one key value pair
    * exists at the same index thanks to the buckets being Maps
    * 
    * @param {any} key The non-hashed value provided by the user, can be any type
    * @return {any} The key/value pair at the given key in the Hash Table or false if
    * the key does not exist in the Hash Table
   */
   get(key: any): boolean {
      // Does not allow keys to be undefined or have a length of 0
      switch (key) {
         case '':
            throw new TypeError('Key or Value cannot be an empty string');
            break;
         case undefined:
            throw new TypeError('Key or Value cannot be undefined');
            break;
      };

      let i: number = 0;
      let hashedIndex: number = this._hash(key) + (i * this._doubleHash(key));

      // While i is less then the Hash Tables size and while the hashedIndex is less than the
      // Hash Tables size
      while (i <= this._size && hashedIndex <= this._size) {
         hashedIndex = this._hash(key) + (i++ * this._doubleHash(key));

         // If the hashedIndex in the buckets array is a Map and the Map the given key
         if (this._buckets[hashedIndex] && this._buckets[hashedIndex].has(key)) {
            // Return the key/value pair at that index
            return this._buckets[hashedIndex].get(key);
         };
      };

      return false
   };

   /**
    * The delete method will call the hash method to decrypt the given key, giving us the exact
    * index needed for retrieval, allowing us to bypass the need to search through the array. We
    * then use the key to delete the correct tupel in our bucket (which are maps). Giving us O(1)
    * delection even if there is more then one value at the same index.
    * 
    * @param {any} key The non-hashed value provided by the user, can be any type
    * @return {boolean} A boolean indicating wether or not the key/value pair was successfully
    * removed from the Hash Table
   */
   delete(key: any): boolean {
      // Does not allow keys to be undefined or have a length of 0
      switch (key) {
         case '':
            throw new TypeError('Key or Value cannot be an empty string');
            break;
         case undefined:
            throw new TypeError('Key or Value cannot be undefined');
            break;
      };

      let i: number = 0;
      let hashedIndex: number = this._hash(key) + (i * this._doubleHash(key));

      // While i and the hashedIndex are less than or equal to the size of the Hash Table and while
      // the hashedIndex is already an exisiting bucket
      while (i <= this._size && hashedIndex <= this._size) {
         hashedIndex = this._hash(key) + (i++ * this._doubleHash(key));

         // If the buckets array at the hashedIndex is not undefined
         if (this._buckets[hashedIndex]) {
            // If the key/value pair in the bucket was successfully deleted
            if (this._buckets[hashedIndex].delete(key)) {
               // Decrease the length since an key/value pair was removed
               this.length--

               // If the Map is now empty
               if (this._buckets[hashedIndex].size === 0) {
                  // Delete the map, this does not alter the buckets array length
                  delete this._buckets[hashedIndex];
                  // Decrease the number of buckets
                  this._numOfBuckets--
               };

               // If the number of buckets is less than 40%
               if (this._numOfBuckets < ~~(this._size * 0.40)) {
                  this._resize('decrease');
               };

               // Return true indicating that the key/value pair was removed
               return true
            };
         };
      };

      return false
   };

   /**
    * The resize method resizes the hash table by either increasing or decreasing the buckets
    * array depending upon if the number of buckets drops below 40% or increases above 70%. It
    * then iterates over the old buckets array and rehashes the keys and inserts the key/value
    * pairs into the new resized array.
    * 
    * @param {string} sizeType A string indicating wether to increase or decrease the size of
    * the Hash Table
   */
   _resize(sizeType: string): void {
      // Helper function used to check if a number is Prime
      const isPrime = (num: number): boolean => {
         for (let i = 2, s = Math.sqrt(num); i <= s; i++)
            if (num % i === 0) return false;
         return num > 1;
      };

      // If the buckets array is less than 70% or greater than 20% full
      if (this._numOfBuckets < ~~(this._size * 0.70) && this._numOfBuckets > ~~(this._size * 0.40)) {
         throw new Error('Cannot resize the Hash Table when the number of buckets is between 40% and 70%');
      };

      // If the resize argument is not valid
      if (sizeType !== 'increase' && sizeType !== 'decrease') {
         throw new Error('Invalid resize argument');
      };

      let newSize: number = 0;

      // If the hashTable needs to increase in size
      if (sizeType === 'increase') {
         // Double size
         newSize = this._size * 2;

         // Keep increasing size untill it is a prime number
         while (!isPrime(newSize)) {
            newSize++;
         };
      };

      // If the hashTable needs to decrease in size
      if (sizeType === 'decrease') {
         // Half the size
         newSize = ~~(this._size / 2);

         // Keep decreasing the size untill it is a prime number and while new size is greater
         // than or equal to the original size
         while (!isPrime(newSize) && newSize >= this._originalSize) {
            newSize--;
         };
      };

      // Set the new size
      this._size = newSize;

      // Create a copy of the current buckets array
      let oldBucketsArray: Array<Map<any, any>> = this._buckets.slice();

      // Replace the current buckets array with the new array and reset the length and numOfBuckets
      this._buckets = new Array(newSize);
      this.length = 0;
      this._numOfBuckets = 0;

      // Loop over the old buckets array
      for (let i: number = 0, len = oldBucketsArray.length; i < len; i++) {
         // If the bucket exists
         if (oldBucketsArray[i] !== undefined) {
            // Loop over the map
            for (let [k, v] of oldBucketsArray[i]) {
               // Add all of the key/value pairs from the old buckets array to the new array
               this.set(k, v);
            };
         };
      };
      oldBucketsArray = [];
   };

   /**
    * Clear is a method that resets the Hash Table back to its initial state
   */
   clear(): void {
      this._buckets = Array(this._originalSize);
      this._size = this._originalSize;
      this._numOfBuckets = 0;
      this.length = 0;
   };
};

export default HashTable;
