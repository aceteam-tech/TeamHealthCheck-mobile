function sortCategories(categories) {
    return categories.slice().sort((a, b) => a.value - b.value)
}

export const lastResults = (healthChecks) => {
    if (healthChecks.length === 0) return undefined

    const ordered = healthChecks.slice().sort((a, b) => a.date - b.date)

    const currentResults = ordered[ordered.length - 1]?.categories
    const previousResults = ordered[ordered.length - 2]?.categories

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
