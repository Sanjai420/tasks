function printLeaders(arr, size) {
    let max = arr[size-1];
    document.write(max + " ");
    
    for (let i = size-2; i >= 0; i--) {
        if (arr[i] > max) {
            max = arr[i];
            document.write(max + " ");
            console.log(max);
        }
    }
}
let arr = [16, 17, 4, 3, 5, 2];
let n = arr.length;
printLeaders(arr, n);
