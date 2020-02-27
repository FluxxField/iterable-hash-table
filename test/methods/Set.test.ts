import HashTable from '../../src/HashTable';
import randomString from '../helperFunctions';

const hashTable = new HashTable();

let key: string;
let value: string;

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