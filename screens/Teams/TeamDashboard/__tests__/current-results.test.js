import { getResults } from '../current-results'

const currentResults = [
    {
        id: '1',
        value: 50
    },
    {
        id: '2',
        value: 50
    }
]

const comparedResults = [
    {
        id: '1',
        value: 33
    },
    {
        id: '2',
        value: 33
    }
]

describe('currentResults function', () => {
    const results = getResults(currentResults, comparedResults)

    it('Returns output in a following shape', function () {
        const outputShape = [
            {
                id: '1',
                value: 50,
                relativeValue: 17
            },
            {
                id: '2',
                value: 50,
                relativeValue: 17
            }
        ]

        expect(results).toEqual(outputShape)
    })

    it('Returns list of categories of a current voting', function () {
        expect(results.length).toBe(currentResults.length)
        expect(results[0]).toMatchObject(currentResults[0])
    })

    it('Each category has a property comparedVotingValue', function () {
        expect(results[0].relativeValue).toBe(17)
    })
})