const randomString = (min: number = 4, max: number = 12): string => {
   let values: string = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_.,:;!?/|\[]{}()@#$%&*^-+=<>`
   let randomLength: number = ~~(Math.random() * (max - min + 1)) + min;
   let i: number = 0;
   let result: string = '';

   while (i < randomLength) {
      result += values[~~(Math.random() * (88 - 0 + 1)) + 0];
      i++;
   };
   return result;
};

export default randomString;
