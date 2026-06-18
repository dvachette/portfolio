const buffer: string[] = [];
const word = "reverse"
function keypress(key: string) {
    buffer.push(key);
    if (buffer.join('') === word) {
        return true;
    } else if (!word.startsWith(buffer.join(''))) {
        buffer.length = 0;
    } 
    return false;
}
export function useReverseStore() {
    return {
        keypress
    }
}
