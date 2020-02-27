'use strict';
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
/**
 * A dictionary/hash map data structure for storing key/value pairs. Finding
 * an entry in a hash table takes O(1) constant time(same for 10 as 1 billion
 * items). Whereas finding an item via binary search takes time proportional
 * to the logarithm of the item in  the list O(logn). Finding an item in a
 * regular old list takes time proportional to the length of the list O(n).
 * Very slow. Hash Tables = very fast
*/
var HashTable = /** @class */ (function () {
    function HashTable(s) {
        if (s === void 0) { s = 11; }
        this._buckets = new Array(s);
        this._numOfBuckets = 0;
        this._originalSize = s;
        this._size = s;
        this.length = 0;
    }
    ;
    /**
     * The Iterator method for the HashTable, allowing the table to be looped over if needed,
     * along with allowing the spread operator to work on it. O(n) with n being length of the
     * hashTable, NOT necessarily the size of the hashTable
    */
    HashTable.prototype[Symbol.iterator] = function () {
        var i, _a, _b, tuple, e_1_1;
        var e_1, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    i = 0;
                    _d.label = 1;
                case 1:
                    if (!(i < this._buckets.length)) return [3 /*break*/, 11];
                    if (!(this._buckets[i] !== undefined)) return [3 /*break*/, 9];
                    _d.label = 2;
                case 2:
                    _d.trys.push([2, 7, 8, 9]);
                    _a = (e_1 = void 0, __values(this._buckets[i])), _b = _a.next();
                    _d.label = 3;
                case 3:
                    if (!!_b.done) return [3 /*break*/, 6];
                    tuple = _b.value;
                    // Yield each tuple in the map
                    return [4 /*yield*/, tuple];
                case 4:
                    // Yield each tuple in the map
                    _d.sent();
                    _d.label = 5;
                case 5:
                    _b = _a.next();
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 9];
                case 7:
                    e_1_1 = _d.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 9];
                case 8:
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 9:
                    ;
                    _d.label = 10;
                case 10:
                    i++;
                    return [3 /*break*/, 1];
                case 11:
                    ;
                    return [2 /*return*/];
            }
        });
    };
    ;
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
    HashTable.prototype._hash = function (key) {
        // Does not allow keys or values to be undefined or have a length of 0
        if (key === undefined || key.length === 0) {
            throw ('Key cannot be undefined');
        }
        ;
        var i;
        var length = key.length - 3;
        var t0 = 0;
        var t1 = 0;
        var v0 = 0x9dc5;
        var v1 = 0x811c;
        for (i = 0; i < length; i++) {
            v0 ^= key.toString().charCodeAt();
            t0 = v0 * 403;
            t1 = v1 * 403;
            t1 += v0 << 8;
            v1 = (t1 + (t0 >>> 16)) & 65535;
            v0 = t0 & 65535;
        }
        ;
        while (i < length + 3) {
            v0 ^= key.toString().charCodeAt(i++);
            t0 = v0 * 403;
            t1 = v1 * 403;
            t1 += v0 << 8;
            v1 = (t1 + (t0 >>> 16)) & 65535;
            v0 = t0 & 65535;
        }
        ;
        return (((v1 << 16) >>> 0) + v0) % this._size;
    };
    ;
    /**
     * doubleHash is a method that is a second simpler hashing function used in tandem with the
     * original hash method. This makes it to where, if there is a collision, i is increased and
     * doubleHash is used to look for a open bucket.
     *
     * @param {any} key The non-hashed value provided by the user, can be any type
     * @return {number} The hashed index from running method on the given key
     */
    HashTable.prototype._doubleHash = function (key) {
        // Helper function used to check if a number is Prime
        var isPrime = function (num) {
            for (var i = 2, s = Math.sqrt(num); i <= s; i++)
                if (num % i === 0)
                    return false;
            return num > 1;
        };
        var PRIME = this._size - 1;
        var hash = 0;
        while (!isPrime(PRIME)) {
            PRIME--;
        }
        ;
        for (var i = 0; i < key.length; i++) {
            // hash << 5 transalets to: hash * (2 ** 5)
            hash = (hash << 5) - hash + key.toString().charCodeAt(i);
            // Convert to 32bit unsigned integer
            hash = hash >>> 0;
        }
        ;
        return PRIME - Math.abs(hash % PRIME);
    };
    ;
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
    HashTable.prototype.set = function (key, value) {
        // Does not allow keys or values to be undefined or have a length of 0
        switch (value && key) {
            case '':
                throw new TypeError('Key or Value cannot be an empty string');
                break;
            case undefined:
                throw new TypeError('Key or Value cannot be undefined');
                break;
        }
        ;
        var i = 0;
        // Because the result of doubleHash is multiplied by i, which starts at zero, the value of
        // doubleHash is only used if there is a collision
        var hashedIndex = this._hash(key) + (i * this._doubleHash(key));
        // While i and the hashedIndex are less than or equal to the size of the Hash Table and while
        // the hashedIndex is already an exisiting bucket
        while (i <= this._size && hashedIndex <= this._size && this._buckets[hashedIndex]) {
            hashedIndex = this._hash(key) + (i++ * this._doubleHash(key)); //?
            // If the hashedIndex in the buckets array is a Map and if the map has the given key
            if (this._buckets[hashedIndex] && this._buckets[hashedIndex].has(key)) {
                // Break out of the while loop
                break;
            }
            ;
        }
        ;
        // If the bucket is empty at this hashedIndex
        if (!this._buckets[hashedIndex]) {
            // Create a bucket
            this._buckets[hashedIndex] = new Map();
            this._numOfBuckets++;
        }
        ;
        // If the hashedIndex in the buckets array is a Map and the Map does NOT have the given key
        if (!this._buckets[hashedIndex].has(key)) {
            // Increase the length because it is a new inserction
            this.length++;
        }
        ;
        // Add key value pair to the bucket
        this._buckets[hashedIndex].set(key, value);
        // Resize the buckets array if the buckets array is 70% full
        if (this._numOfBuckets > ~~(this._size * 0.70)) {
            this._resize('increase');
        }
        ;
        return hashedIndex;
    };
    ;
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
    HashTable.prototype.get = function (key) {
        // Does not allow keys to be undefined or have a length of 0
        switch (key) {
            case '':
                throw new TypeError('Key or Value cannot be an empty string');
                break;
            case undefined:
                throw new TypeError('Key or Value cannot be undefined');
                break;
        }
        ;
        var i = 0;
        var hashedIndex = this._hash(key) + (i * this._doubleHash(key));
        // While i is less then the Hash Tables size and while the hashedIndex is less than the
        // Hash Tables size
        while (i <= this._size && hashedIndex <= this._size) {
            hashedIndex = this._hash(key) + (i++ * this._doubleHash(key));
            // If the hashedIndex in the buckets array is a Map and the Map the given key
            if (this._buckets[hashedIndex] && this._buckets[hashedIndex].has(key)) {
                // Return the key/value pair at that index
                return this._buckets[hashedIndex].get(key);
            }
            ;
        }
        ;
        return false;
    };
    ;
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
    HashTable.prototype.delete = function (key) {
        // Does not allow keys to be undefined or have a length of 0
        switch (key) {
            case '':
                throw new TypeError('Key or Value cannot be an empty string');
                break;
            case undefined:
                throw new TypeError('Key or Value cannot be undefined');
                break;
        }
        ;
        var i = 0;
        var hashedIndex = this._hash(key) + (i * this._doubleHash(key));
        // While i and the hashedIndex are less than or equal to the size of the Hash Table and while
        // the hashedIndex is already an exisiting bucket
        while (i <= this._size && hashedIndex <= this._size) {
            hashedIndex = this._hash(key) + (i++ * this._doubleHash(key));
            // If the buckets array at the hashedIndex is not undefined
            if (this._buckets[hashedIndex]) {
                // If the key/value pair in the bucket was successfully deleted
                if (this._buckets[hashedIndex].delete(key)) {
                    // Decrease the length since an key/value pair was removed
                    this.length--;
                    // If the Map is now empty
                    if (this._buckets[hashedIndex].size === 0) {
                        // Delete the map, this does not alter the buckets array length
                        delete this._buckets[hashedIndex];
                        // Decrease the number of buckets
                        this._numOfBuckets--;
                    }
                    ;
                    // If the number of buckets is less than 40%
                    if (this._numOfBuckets < ~~(this._size * 0.40)) {
                        this._resize('decrease');
                    }
                    ;
                    // Return true indicating that the key/value pair was removed
                    return true;
                }
                ;
            }
            ;
        }
        ;
        return false;
    };
    ;
    /**
     * The resize method resizes the hash table by either increasing or decreasing the buckets
     * array depending upon if the number of buckets drops below 40% or increases above 70%. It
     * then iterates over the old buckets array and rehashes the keys and inserts the key/value
     * pairs into the new resized array.
     *
     * @param {string} sizeType A string indicating wether to increase or decrease the size of
     * the Hash Table
    */
    HashTable.prototype._resize = function (sizeType) {
        var e_2, _a;
        // Helper function used to check if a number is Prime
        var isPrime = function (num) {
            for (var i = 2, s = Math.sqrt(num); i <= s; i++)
                if (num % i === 0)
                    return false;
            return num > 1;
        };
        // If the buckets array is less than 70% or greater than 20% full
        if (this._numOfBuckets < ~~(this._size * 0.70) && this._numOfBuckets > ~~(this._size * 0.40)) {
            throw new Error('Cannot resize the Hash Table when the number of buckets is between 40% and 70%');
        }
        ;
        // If the resize argument is not valid
        if (sizeType !== 'increase' && sizeType !== 'decrease') {
            throw new Error('Invalid resize argument');
        }
        ;
        var newSize = 0;
        // If the hashTable needs to increase in size
        if (sizeType === 'increase') {
            // Double size
            newSize = this._size * 2;
            // Keep increasing size untill it is a prime number
            while (!isPrime(newSize)) {
                newSize++;
            }
            ;
        }
        ;
        // If the hashTable needs to decrease in size
        if (sizeType === 'decrease') {
            // Half the size
            newSize = ~~(this._size / 2);
            // Keep decreasing the size untill it is a prime number and while new size is greater
            // than or equal to the original size
            while (!isPrime(newSize) && newSize >= this._originalSize) {
                newSize--;
            }
            ;
        }
        ;
        // Set the new size
        this._size = newSize;
        // Create a copy of the current buckets array
        var oldBucketsArray = this._buckets.slice();
        // Replace the current buckets array with the new array and reset the length and numOfBuckets
        this._buckets = new Array(newSize);
        this.length = 0;
        this._numOfBuckets = 0;
        // Loop over the old buckets array
        for (var i = 0, len = oldBucketsArray.length; i < len; i++) {
            // If the bucket exists
            if (oldBucketsArray[i] !== undefined) {
                try {
                    // Loop over the map
                    for (var _b = (e_2 = void 0, __values(oldBucketsArray[i])), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var _d = __read(_c.value, 2), k = _d[0], v = _d[1];
                        // Add all of the key/value pairs from the old buckets array to the new array
                        this.set(k, v);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                ;
            }
            ;
        }
        ;
        oldBucketsArray = [];
    };
    ;
    /**
     * Clear is a method that resets the Hash Table back to its initial state
    */
    HashTable.prototype.clear = function () {
        this._buckets = Array(this._originalSize);
        this._size = this._originalSize;
        this._numOfBuckets = 0;
        this.length = 0;
    };
    ;
    return HashTable;
}());
;
export default HashTable;
