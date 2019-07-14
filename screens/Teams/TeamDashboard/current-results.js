function sortResults(categories) {
    return categories.slice().sort((a, b) => a.value - b.value)
}

export const getResults = (currentResults, comparedResults) => {
    const sorted = sortResults(currentResults)

    const results = comparedResults ?
        addPreviousValues(sorted, comparedResults) :
        sorted

    return results
}

function addPreviousValues(currentResults, previousResults) {
    return currentResults.map(c => {
        const currentValue = c.value
        const comparedValue = previousResults.find(prev => prev.id === c.id)?.value

        const relativeValue = Math.round(currentValue - comparedValue)

        return { ...c, relativeValue }
    })
}
