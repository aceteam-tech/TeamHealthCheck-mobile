import {switchInput, updateCode} from './VerifyCode.helpers'

describe('Verify Code', () => {
    describe('Switch input fn', () => {
        /*
        * input:
        *   [string] code,
        *   [number] length
        * output:
        *   [number] focusedInputIndex
        * */
        const length = 6

        describe('For empty code', () => {
            const code = ''
            it('should focus input index 0', function () {
                expect(switchInput(code, length)).toEqual(0)
            })
        });

        describe('For single digit code', () => {
            const code = '1'
            it('should focus input index 1', function () {
                expect(switchInput(code, length)).toEqual(1)
            })
        });

        describe('For complete code', () => {
            const code = '123456'
            it(`should focus input index ${length - 1}`, function () {
                expect(switchInput(code, length)).toEqual(5)
            })
        });
    });
    describe('updateCode fn', () => {
        /*
        * input:
        *   [string] code,
        *   [string]: key,
        *   [number] length
        * output:
        *   [string] code
        * */
        const length = 6
        describe('For first input', () => {
            describe('when a digit is pressed', () => {
                const code = ''
                const key = '1'
                it('should concatenate key to the code', function () {
                    expect(updateCode(code, key, length)).toEqual('1')
                })
            });
            describe('when backspace is pressed', () => {
                const code = ''
                const key = 'Backspace'
                it('should not do anything', function () {
                    expect(updateCode(code, key, length)).toEqual('')
                })
            });
        });

        describe('For second input', () => {
            describe('when a digit is pressed', () => {
                const code = '1'
                const key = '2'
                it('should concatenate key to the code', function () {
                    expect(updateCode(code, key, length)).toEqual('12')
                })
            });
            describe('when backspace is pressed', () => {
                const code = '1'
                const key = 'Backspace'
                it('should remove last digit', function () {
                    expect(updateCode(code, key, length)).toEqual('')
                })
            });
        });

        describe('For last input', () => {
            describe('when a digit is pressed', () => {
                const code = '12345'
                const key = '6'
                it('should concatenate key to the code', function () {
                    expect(updateCode(code, key, length)).toEqual('123456')
                })
            });
            describe('when backspace is pressed', () => {
                const code = '12345'
                const key = 'Backspace'
                it('should remove last digit', function () {
                    expect(updateCode(code, key, length)).toEqual('1234')
                })
            });
        });

        describe('After last input is filled', () => {
            describe('when a digit is pressed', () => {
                const code = '123456'
                const key = '7'
                it('should concatenate key to the code', function () {
                    expect(updateCode(code, key, length)).toEqual('123456')
                })
            });
        });

    });
});