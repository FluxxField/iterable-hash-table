#### Public Methods

* **Set** - The set method will call the hash method to encrypt our insertion key and insert its value at this specified index in our storage array (any index from 0 to size) By using a Map as our buckets, we get the benifit of being able to handle hash collisions while still maintaining 0(1) constant time retrieval of any key and value in the Map.
* **Get** - The get method will call the hash method again, this time to decrypt our key(in a way). Since it knows the exact index of retrieval in our storage array, we are able to bypass the need to search through the array, resulting in an almost instantaneous O(1) constant time retrieval of any key and value in our hash, even if more then one key value pair exists at the same index thanks to the buckets being Maps
* **Delete** - The delete method will call the hash method to decrypt the given key, giving us the exact index needed for retrieval, allowing us to bypass the need to search through the array. We then use the key to delete the correct tupel in our bucket (which are maps). Giving us O(1) delection even if there is more then one value at the same index.
* **Clear** - Clear is a method that resets the Hash Table back to its initial state. Setting the _buckets array to the original size. It also resets all of the properties to their original state.

#### Public Properties

* **Length** - The number of key/value pairs inserted into the Hash Table

#### Private Methods

* **_hash** - Hash is a method that converts any key such as 'alex', 'best hotels', 'google' etc.. and converts it into a 'seemingly' random number. This number will be our hash key. It's not really random since it will always be the same for any particular key. Sort of like an encrypted version of our hash key that we will later decrypt when we need to retrieve the desired key. Note that the number output by this function cannot be any larger than the size of our hash table. See the size value we set above.
* **_doubleHash** - DoubleHash is a method that is a second simpler hashing function used in tandem with the original hash method. This makes it to where, if there is a collision, i is increased and doubleHash is used to look for a open bucket.
* **_resize** - The resize method resizes the hash table by either increasing or decreasing the buckets array depending upon if the number of buckets drops below 40% or increases above 70%. It then iterates over the old buckets array and rehashes the keys and inserts the key/value pairs into the new resized array.

#### Private Properties

* **_buckets** - The Array that stores all of the buckets, length is based of the _size
* **_numOfBuckets** - A number representing how many buckets the Hash Table has
* **_originalSize** - The Original size of the Hash Table, used as a reference when the Hash Table is cleared
* **_size** - The current size of the Hash Table. Updates as the Hash Table resizes
