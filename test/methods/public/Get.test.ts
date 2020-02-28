import HashTable from '../../../src/HashTable';
import randomString from '../../helperFunctions';

const hashTable = new HashTable();

let key: string;
let value: string;

describe('Get Method', () => {
   beforeEach(() => {
      key = randomString();
      value = randomString();
   });

   afterEach(() => {
      hashTable.clear();
   });

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
