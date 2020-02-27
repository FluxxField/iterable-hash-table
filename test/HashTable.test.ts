import HashTable from '../src/HashTable';
import randomString from './helperFunctions';

describe('Hash Table Class', () => {
   const hashTable = new HashTable();

   let k: string;
   let v: string;

   test('should have a iterator function', () => {
      expect(hashTable[Symbol.iterator]).toEqual(expect.any(Function));
   });

   test('when the spread operator is called on the Hast Table, should return all of the items in the Hash Table', () => {
      for (let i: number = 0; i < 5; i++) {
         k = randomString();
         v = randomString();
         hashTable.set(k, v);
      };

      expect([...hashTable]).toContainEqual([k, v])
   });

   // // Public Methods for the Hash Table Class
   // describe('Public Methods', () => {
   //    let key;
   //    let value;

   //    describe('Get Method', () => {
   //       test('Get should be a function', () => {
   //          expect(hashTable.get).toEqual(expect.any(Function))
   //       });

   //       describe('Error handeling', () => {
   //          test('should throw an error if the key is undefined', () => {
   //             const setUndefined = () => {
   //                hashTable.set(undefined, value);
   //             };
   //             expect(setUndefined).toThrowError('Key or Value cannot be undefined')
   //          });

   //          test('should throw an error if the key is an empty string', () => {
   //             const setUndefined = () => {
   //                hashTable.set('', value);
   //             };
   //             expect(setUndefined).toThrowError('Key or Value cannot be an empty string')
   //          });
   //       });
   //    });

   //    describe('Delete Method', () => {
   //       test('Delete should be a function', () => {
   //          expect(hashTable.delete).toEqual(expect.any(Function))
   //       });

   //       describe('Error handeling', () => {
   //          test('should throw an error if the key is undefined', () => {
   //             const setUndefined = () => {
   //                hashTable.set(undefined, value);
   //             };
   //             expect(setUndefined).toThrowError('Key or Value cannot be undefined')
   //          });

   //          test('should throw an error if the key is an empty string', () => {
   //             const setUndefined = () => {
   //                hashTable.set('', value);
   //             };
   //             expect(setUndefined).toThrowError('Key or Value cannot be an empty string')
   //          });
   //       });
   //    });
   // });

   // // Private Methods for the Hash Table Class
   // describe('Private Methods', () => {
   //    describe('Hash Method', () => {
   //       test('_hash should be a function', () => {
   //          expect(hashTable._hash).toEqual(expect.any(Function))
   //       });
   //    });

   //    describe('Get Method', () => {
   //       test('_doubleHash should be a function', () => {
   //          expect(hashTable._doubleHash).toEqual(expect.any(Function))
   //       });
   //    });

   //    describe('Resize Method', () => {
   //       test('_resize should be a function', () => {
   //          expect(hashTable._resize).toEqual(expect.any(Function))
   //       });
   //    });
   // });
});