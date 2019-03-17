export function switchInput(code, length){
    return code.length === length ? length - 1 : code.length
}

export function updateCode(code, key, length){
    if(key == 'Backspace'){
        return !!code ? code.slice(0, code.length - 1) : ''
    }
    return code.length < length ? code + key : code
}
