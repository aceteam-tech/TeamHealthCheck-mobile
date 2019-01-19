export const getTeamInitials = (name) => {
    const words = name.split(' ').filter(w => w !== '')
    if (words.length < 2) {
        return name.slice(0, 3).replace(/\s/g, '')
    }
    if (words.length === 2) {
        return words[0][0] + words[1][0]
    }
    return words[0][0] + words[1][0] + words[2][0]
}