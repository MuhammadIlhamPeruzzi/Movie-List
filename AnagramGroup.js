function checkAnagram(s1, s2) {

    if(s1.length !== s2.length){
        return false
    }
    const NO_OF_CHARS = 256;
    let counter = new Array(NO_OF_CHARS);
    for(let i = 0; i < NO_OF_CHARS; i++)
    {
        counter[i] = 0;
    }
    for(var i = 0; i < s1.length; i++)
    {
        counter[s1.charCodeAt(i)]++;
        counter[s2.charCodeAt(i)]--;
    }
    for(var i = 0; i < NO_OF_CHARS; i++)
        if (counter[i] != 0)
        {
            return false;
        }
    return true;
}

function groupAnagram(arrStr){
    usedArr = []
    result = []
    for(var i=0; i<arrStr.length;i++){
        if(usedArr.indexOf(arrStr[i])<0){
            var group = []
            for(var j=i+1; j<arrStr.length;j++){
                if(checkAnagram(arrStr[i], arrStr[j])){
                    group.push(arrStr[j])
                    usedArr.push(arrStr[j])
                }
            }
            group.push(arrStr[i])
            usedArr.push(arrStr[i])
            result.push(group)
        }
    }
    return result
}

const testArr = ['kita', 'atik', 'tika', 'aku', 'kia', 'makan', 'kua']

console.log(groupAnagram(testArr))