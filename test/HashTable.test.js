const HashTable = require('../public/HashTable');

const randomString = (min = 4, max = 12) => {
   let values = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_.,:;!?/|\[]{}()@#$%&*^-+=<>`
   let randomLength = ~~(Math.random() * (max - min + 1)) + min;
   let i = 0;
   let result = '';

   while (i < randomLength) {
      result += values[~~(Math.random() * (88 - 0 + 1)) + 0];
      i++;
   };
   return result;
};

describe('Hash Table Class', () => {
   const hashTable = new HashTable();

   test('should have a iterator function', () => {
      expect(hashTable[Symbol.iterator]).toEqual(expect.any(Function));
   });

   test('when the spread operator is called on the Hast Table, should return all of the items in the Hash Table', () => {
      for (let i = 0; i < 5; i++) {
         k = randomString();
         v = randomString();
         hashTable.set(k, v);
      };

      expect([...hashTable]).toContainEqual([k, v])
   });

   // Public Methods for the Hash Table Class
   describe('Public Methods', () => {
      let key;
      let value;

      describe('Set Method', () => {
         beforeEach(() => {
            key = randomString();
            value = randomString();
         });

         afterEach(() => {
            hashTable.clear();
         });

         test('should be a function', () => {
            expect(hashTable.set).toEqual(expect.any(Function))
         });

         test('the length property should increase as items are added', () => {
            for (let i = 0; i < 7; i++) {
               hashTable.set(randomString(), randomString());
            };
            expect(hashTable.length).toEqual(7)
         });

         test('the _numOfBuckets property should increase when a new bucket is added', () => {
            hashTable.set(key, value);
            expect(hashTable._numOfBuckets).toEqual(1)
         });

         test('should resize when the number of buckets is greater than 70%', () => {
            for (let i = 0; i < 20; i++) {
               hashTable.set(randomString(), randomString());
            };
            expect(hashTable._size).toBeGreaterThan(hashTable._originalSize)
         });

         test('should override a value at a given key if that key already exists in the Hash Table', () => {
            hashTable.set(key, randomString())
            hashTable.set(key, value);
            expect(hashTable.get(key)).toEqual(value);
         });

         test('should return the index where the key/value pair was placed', () => {
            let k = hashTable.set(key, value);
            expect(hashTable.set(key, value)).toEqual(k);
         });

         test('should handle 50,000 inserts with less than 1% of the inserts ending in collisions', () => {
            for (let i = 0; i < 50000; i++) {
               hashTable.set(randomString(), randomString());
            };
            expect(hashTable.length).toBeGreaterThan(50000 * 0.99)
         });

         describe('Error handeling', () => {
            test('should throw an error if the key is undefined', () => {
               const setUndefined = () => {
                  hashTable.set(undefined, value);
               };
               expect(setUndefined).toThrowError('Key or Value cannot be undefined')
            });

            test('should throw an error if the key is an empty string', () => {
               const setUndefined = () => {
                  hashTable.set('', value);
               };
               expect(setUndefined).toThrowError('Key or Value cannot be an empty string')
            });

            test('should throw an error if the value is undefined', () => {
               const setUndefined = () => {
                  hashTable.set(key, undefined);
               };
               expect(setUndefined).toThrowError('Key or Value cannot be undefined')
            });

            test('should throw an error if the value is an empty string', () => {
               const setUndefined = () => {
                  hashTable.set(key, '');
               };
               expect(setUndefined).toThrowError('Key or Value cannot be an empty string')
            });
         });
      });

      describe('Get Method', () => {
         test('Get should be a function', () => {
            expect(hashTable.get).toEqual(expect.any(Function))
         });

         describe('Error handeling', () => {
            test('should throw an error if the key is undefined', () => {
               const setUndefined = () => {
                  hashTable.set(undefined, value);
               };
               expect(setUndefined).toThrowError('Key or Value cannot be undefined')
            });

            test('should throw an error if the key is an empty string', () => {
               const setUndefined = () => {
                  hashTable.set('', value);
               };
               expect(setUndefined).toThrowError('Key or Value cannot be an empty string')
            });
         });
      });

      describe('Delete Method', () => {
         test('Delete should be a function', () => {
            expect(hashTable.delete).toEqual(expect.any(Function))
         });

         describe('Error handeling', () => {
            test('should throw an error if the key is undefined', () => {
               const setUndefined = () => {
                  hashTable.set(undefined, value);
               };
               expect(setUndefined).toThrowError('Key or Value cannot be undefined')
            });

            test('should throw an error if the key is an empty string', () => {
               const setUndefined = () => {
                  hashTable.set('', value);
               };
               expect(setUndefined).toThrowError('Key or Value cannot be an empty string')
            });
         });
      });
   });

   // Private Methods for the Hash Table Class
   describe('Private Methods', () => {
      describe('Hash Method', () => {
         test('_hash should be a function', () => {
            expect(hashTable._hash).toEqual(expect.any(Function))
         });
      });

      describe('Get Method', () => {
         test('_doubleHash should be a function', () => {
            expect(hashTable._doubleHash).toEqual(expect.any(Function))
         });
      });

      describe('Resize Method', () => {
         test('_resize should be a function', () => {
            expect(hashTable._resize).toEqual(expect.any(Function))
         });
      });
   });
});