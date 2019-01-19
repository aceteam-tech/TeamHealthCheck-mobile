import 'react-native';
import React from 'react';
import {getTeamInitials} from './TeamLogo.helpers';

describe('getTeamInitials function', () => {
    describe('Happy path', () => {
        it('For 1 character', () => {
            const initials = getTeamInitials('A')
            expect(initials).toEqual('A')
        })
        it('For 2 characters', () => {
            const initials = getTeamInitials('Ac')
            expect(initials).toEqual('Ac')
        })
        it('For 3 characters', () => {
            const initials = getTeamInitials('Ace')
            expect(initials).toEqual('Ace')
        })
        it('For 4 characters', () => {
            const initials = getTeamInitials('Acet')
            expect(initials).toEqual('Ace')
        })
        it('For two words', () => {
            const initials = getTeamInitials('Ace Team')
            expect(initials).toEqual('AT')
        })
        it('For three words', () => {
            const initials = getTeamInitials('Ace Team Guys')
            expect(initials).toEqual('ATG')
        })
        it('For more than three words', () => {
            const initials = getTeamInitials('Ace Team Guys Test Test')
            expect(initials).toEqual('ATG')
        })
    });
    describe('Edge cases', () => {
        it('For 0 characters', () => {
            const initials = getTeamInitials('')
            expect(initials).toEqual('')
        })
        it('For 2 characters including space', () => {
            const initials = getTeamInitials('A ')
            expect(initials).toEqual('A')
        })
        it('For 3 characters including space', () => {
            const initials = getTeamInitials('Ac ')
            expect(initials).toEqual('Ac')
        })
    });
})
