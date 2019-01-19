export const getInitials = (name) => {
    const words = name.split(' ').filter(w => w !== '')
    if (words.length < 2) {
        return name.slice(0, 2).replace(/\s/g, '')
    }
    return words[0][0] + words[1][0]
}