import {getInitials} from './Avatar.helpers';

describe('getInitials function', () => {
    describe('Happy path', () => {
        it('For 1 character', () => {
            const initials = getInitials('A')
            expect(initials).toEqual('A')
        })
        it('For 2 characters', () => {
            const initials = getInitials('Ac')
            expect(initials).toEqual('Ac')
        })
        it('For 3 characters', () => {
            const initials = getInitials('Ace')
            expect(initials).toEqual('Ac')
        })
        it('For 4 characters', () => {
            const initials = getInitials('Acet')
            expect(initials).toEqual('Ac')
        })
        it('For two words', () => {
            const initials = getInitials('Ace Team')
            expect(initials).toEqual('AT')
        })
        it('For three words', () => {
            const initials = getInitials('Ace Team Guys')
            expect(initials).toEqual('AT')
        })
        it('For more than three words', () => {
            const initials = getInitials('Ace Team Guys Test Test')
            expect(initials).toEqual('AT')
        })
    });
    describe('Edge cases', () => {
        it('For 0 characters', () => {
            const initials = getInitials('')
            expect(initials).toEqual('')
        })
        it('For 2 characters including space', () => {
            const initials = getInitials('A ')
            expect(initials).toEqual('A')
        })
        it('For 3 characters including space', () => {
            const initials = getInitials('Ac ')
            expect(initials).toEqual('Ac')
        })
    });
})
