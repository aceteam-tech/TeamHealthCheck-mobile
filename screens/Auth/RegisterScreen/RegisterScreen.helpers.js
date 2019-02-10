const passwordMinimumLength = function(input){
    return input.length >= 8
}

const passwordMinimumUppercase = function(input){
    return /[A-Z]/.test(input)
}

const passwordMinimumLowercase = function(input){
    return /[a-z]/.test(input)
}

const passwordMinimumDigits = function(input){
    return /[0-9]/.test(input)
}

const fullName = function(input){
    return input.split(' ').length >= 2 && input[input.length-1] !== ' '
}

const validEmail = function(input){
    return input.includes('@') &&
        input.includes('.') &&
        input[input.length-1] !== '@' &&
        input[input.length-1] !== '.'
}

export const validations = {
    name: [
        {
            descriptionError: 'Not a full name',
            fn: fullName
        }
    ],
    email: [
        {
            descriptionError: 'Not a valid email',
            fn: validEmail
        }
    ],
    password: [
        {
            descriptionError: 'Password is too short',
            fn: passwordMinimumLength
        },
        {
            descriptionError: 'Password must contain uppercase letters',
            fn: passwordMinimumUppercase
        },
        {
            descriptionError: 'Password must contain lowercase letters',
            fn: passwordMinimumLowercase
        },
        {
            descriptionError: 'Password must contain digits',
            fn: passwordMinimumDigits
        }
    ]
}

export const validator = (rules, input) => {
    for(let i=0; i<rules.length; i++){
        if(!rules[i].fn(input)){
            return rules[i].descriptionError
        }
    }
}