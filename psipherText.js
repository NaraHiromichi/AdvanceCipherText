
const prompt = require("prompt-sync")()
const collectDataForEncryption = () => {
    return new Promise((resolve) => {
        const rawText = prompt("Enter normal text: ")
        const rawKey = prompt(`Enter any numbers... 
        eg. 455532
        (NOTE!!! This encrypted text can by decrypted by only with this tool)
        Enter the key(numbers): `)
        resolve([rawKey, rawText])
    })
} 
const collectDataForDecryption = () => {
    return new Promise((resolve) => {
        const rawText = prompt("Enter secret text: ")
        const rawKey = prompt(`Enter any numbers... 
        eg. 455532
        Enter the key(numbers): `)
        resolve([rawKey, rawText])
    })
} 
const InputOptionFunc = () => {
    return new Promise((resolve) => {
        const selectedOption = prompt(`Choose one option...
        1. Encrypt: normal text to secret text
        2. Decrypt: secret text to normal text
        
        choose option ==> `)
        resolve(selectedOption)
    })
} 
const askingProcess = async() => {
    const selectedOption = await InputOptionFunc()
    if(selectedOption === '1') {
        const [rawKey, rawText] = await collectDataForEncryption()
        
        return [selectedOption, rawText, rawKey]
    }
    const [rawKey, rawText] = await collectDataForDecryption()
    
    return [selectedOption, rawText, rawKey]
}

let alpha = Array.from(Array(26)).map((e, i) => i + 65)
const capitalLetters = alpha.map(x => String.fromCharCode(x))
const smallLetters =capitalLetters.map(l => l.toLowerCase())
const encryptProcess = (Text, key) => {
    return new Promise ((resolve) => {
        let encrpytedText = []
        Text.forEach((t) => {
            const isCapital = t.toUpperCase() === t ? true : false;
            if(t === " ") {
                encrpytedText.push(" ")
                return 
            }
            const tempIndex = isCapital ? capitalLetters.indexOf(t) : smallLetters.indexOf(t)
            const leftItemCount = capitalLetters.length - (tempIndex + 1)
            const excessItemCount = key[0] - leftItemCount
            
            if(excessItemCount > 0) {
             encrpytedText.push(isCapital ? capitalLetters[excessItemCount - 1] : smallLetters[excessItemCount - 1])
             // for infinite nested loop
             key.push(key.shift())
             return 
            }
            
            encrpytedText.push(isCapital ? capitalLetters[key[0] + tempIndex] : smallLetters[key[0] + tempIndex])
            // for infinite nested loop
            key.push(key.shift())
         })
         resolve(encrpytedText)
    })
}
const decryptProcess = (Text, key) => {
    return new Promise ((resolve) => {
        let decryptedText = []
        Text.forEach((t) => {
            const isCapital = t.toUpperCase() === t ? true : false;
            if(t === " ") {
                decryptedText.push(" ")
                return 
            }
            const tempIndex = isCapital ? capitalLetters.indexOf(t) : smallLetters.indexOf(t)
            const leftItemCount = tempIndex
            const excessItemCount = key[0] - leftItemCount
            
            if(excessItemCount > 0) {
             decryptedText.push(isCapital ? capitalLetters[capitalLetters.length - excessItemCount] : smallLetters[smallLetters.length - excessItemCount])
             // for infinite nested loop
             key.push(key.shift())
             return 
            }
            
            decryptedText.push(isCapital ? capitalLetters[tempIndex - key[0]] : smallLetters[tempIndex - key[0]])
            // for infinite nested loop
            key.push(key.shift())
         })
         resolve(decryptedText)
    })
}

const mainProcess = async () => {
    const [ selectedOption, rawText, rawKey] = await askingProcess()
    const Text =  rawText.split("")
    
    const key = rawKey.split("").map(k => parseInt(k))
    if(selectedOption === '1'){
        const encrpytedTextArray = await encryptProcess(Text, key)
        
        const encrpytedText = encrpytedTextArray.join("")
        console.log(encrpytedText)
        return
    }
    const decryptedTextArray = await decryptProcess(Text, key)
    const decryptedText = decryptedTextArray.join("")
    console.log(decryptedText)
}

mainProcess()


