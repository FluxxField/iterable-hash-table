// Type definitions for iterable-hash-table@3.2.0
// Project: iterable-hash-table
// Definitions by: Keenan Johns aka FluxxField <https://github.com/FluxxField>

// Note that ES6 modules cannot directly export class objects.
// This file should be imported using the CommonJS-style:
//   import x = require('iterable-hash-table');
//
// Alternatively, if --allowSyntheticDefaultImports or
// --esModuleInterop is turned on, this file can also be
// imported as a default import:
//   import HashTable from 'iterable-hash-table';
//
// Refer to the TypeScript documentation at
// https://www.typescriptlang.org/docs/handbook/modules.html#export--and-import--require
// to understand common workarounds for this limitation of ES6 modules.

export default HashTable;

/*~ Write your module's methods and properties in this class */
declare class HashTable {
   constructor(s: string);

   _buckets: Array<Map<any, any>>
   _numOfBuckets: number
   _originalSize: number
   _size: number
   length: number

   set(key: any, value: any): number
   get(key: any): boolean
   delete(key: any): boolean
   clear(): void

   _hash(key: any): number
   _doubleHash(key: any): number
   _resize(sizeType: string): void
}
