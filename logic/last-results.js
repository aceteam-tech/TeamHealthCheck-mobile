function sortCategories(categories) {
    return categories.slice().sort((a, b) => a.value - b.value)
}

export const lastResults = (healthChecks) => {
    if (healthChecks.length === 0) return undefined

    healthChecks.sort((a, b) => a.date - b.date)

    const currentResults = healthChecks[healthChecks.length - 1]?.categories
    const previousResults = healthChecks[healthChecks.length - 2]?.categories

    return sortCategories(
        previousResults ?
            addPreviousValues(currentResults, previousResults) :
            currentResults
    )
}

function addPreviousValues(currentResults, previousResults) {
    return currentResults.map(c => {
        const previousValue = previousResults
            .find(prev => prev.id === c.id)?.value

        return { ...c, previousValue }
    })
}
