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
});