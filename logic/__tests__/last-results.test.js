import {lastResults} from '../last-results'

const healthChecks = [
    {
        "categories": [
            {
                "descriptionGreen": "We're learning lots of interesting stuff all the time!",
                "descriptionRed": "We never have time to learn anything.",
                "groupId": "1",
                "id": "2",
                "image": "learning",
                "name": "Learning",
                "value": 0
            },
            {
                "descriptionGreen": "We are in control of our own destiny! We decide what to build and how to build it.",
                "descriptionRed": "We are just pawns in a game of chess with no influence over what we build or how we build it.",
                "groupId": "1",
                "id": "8",
                "image": "pawnsOrPlayers",
                "name": "Pawns or Players",
                "value": 0
            }
        ],
        "date": 100,
        "ended": true,
        "id": "873a86d8-e589-403d-8fa0-1281b0a5cf8f",
        "team_id": "f678b058-676f-4144-8900-b0ad7be6e63f"
    },
    {
        "categories": [
            {
                "descriptionGreen": "We're learning lots of interesting stuff all the time!",
                "descriptionRed": "We never have time to learn anything.",
                "groupId": "1",
                "id": "2",
                "image": "learning",
                "name": "Learning",
                "value": 100
            },
            {
                "descriptionGreen": "We are in control of our own destiny! We decide what to build and how to build it.",
                "descriptionRed": "We are just pawns in a game of chess with no influence over what we build or how we build it.",
                "groupId": "1",
                "id": "8",
                "image": "pawnsOrPlayers",
                "name": "Pawns or Players",
                "value": 100
            },
            {
                "descriptionGreen": "We get stuff done really quickly! No waiting and no delays.",
                "descriptionRed": "We never seem to get anything done. We keep getting stuck or interrupted. Stories keep getting stuck on dependencies.",
                "groupId": "1",
                "id": "9",
                "image": "speed",
                "name": "Speed",
                "value": 100
            }
        ],
        "date": 0,
        "ended": true,
        "id": "6e18748a-a9cf-49be-b08d-ffb6c5624772",
        "team_id": "f678b058-676f-4144-8900-b0ad7be6e63f"
    },
    {
        "categories": [
            {
                "descriptionGreen": "We're learning lots of interesting stuff all the time!",
                "descriptionRed": "We never have time to learn anything.",
                "groupId": "1",
                "id": "2",
                "image": "learning",
                "name": "Learning",
                "value": 100
            },
            {
                "descriptionGreen": "We are in control of our own destiny! We decide what to build and how to build it.",
                "descriptionRed": "We are just pawns in a game of chess with no influence over what we build or how we build it.",
                "groupId": "1",
                "id": "8",
                "image": "pawnsOrPlayers",
                "name": "Pawns or Players",
                "value": 100
            },
            {
                "descriptionGreen": "We get stuff done really quickly! No waiting and no delays.",
                "descriptionRed": "We never seem to get anything done. We keep getting stuck or interrupted. Stories keep getting stuck on dependencies.",
                "groupId": "1",
                "id": "9",
                "image": "speed",
                "name": "Speed",
                "value": 100
            }
        ],
        "date": 200,
        "ended": true,
        "id": "af6a4894-e58b-429d-99e6-7db81eaaf2ef",
        "team_id": "f678b058-676f-4144-8900-b0ad7be6e63f"
    }
]

describe('lastResults function', () => {
    describe('For three elements', () => {
        it('Returns last element with previous values', function () {
            const expected = [
                {
                    "descriptionGreen": "We're learning lots of interesting stuff all the time!",
                    "descriptionRed": "We never have time to learn anything.",
                    "groupId": "1",
                    "id": "2",
                    "image": "learning",
                    "name": "Learning",
                    "value": 100,
                    previousValue: 0
                },
                {
                    "descriptionGreen": "We are in control of our own destiny! We decide what to build and how to build it.",
                    "descriptionRed": "We are just pawns in a game of chess with no influence over what we build or how we build it.",
                    "groupId": "1",
                    "id": "8",
                    "image": "pawnsOrPlayers",
                    "name": "Pawns or Players",
                    "value": 100,
                    previousValue: 0
                },
                {
                    "descriptionGreen": "We get stuff done really quickly! No waiting and no delays.",
                    "descriptionRed": "We never seem to get anything done. We keep getting stuck or interrupted. Stories keep getting stuck on dependencies.",
                    "groupId": "1",
                    "id": "9",
                    "image": "speed",
                    "name": "Speed",
                    "value": 100
                }
            ]
            const healthCheck = lastResults(healthChecks)
            expect(healthCheck).toEqual(expected)
        })
    })
    describe('For no elements', () => {
        it('Returns undefined', function () {
            const expected = undefined
            const healthCheck = lastResults([])
            expect(healthCheck).toEqual(expected)
        })
    })
})