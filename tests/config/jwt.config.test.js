import { getToken, getTokenData } from '../../src/config/jwt.config.js';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken', () => {
    return {
        sign: jest.fn(),
        verify: jest.fn()
    }
});

const fakeSign = jest.spyOn(jwt, 'sign');
const fakeVerify = jest.spyOn(jwt, 'verify');

test(' test of json web token Data', () => {
    fakeSign.mockImplementation((data) => {
        return `${JSON.stringify(data)} x action SECRET`;
    });
    fakeVerify.mockReturnValue('data retributied correctly');

    const data = {
        email: 'testmail@example.com',
        name: 'Pedro Pablo',
        code: '590213490324i',
    };

    const resultToken = getToken(data,);

    expect(resultToken).toBe('"{\"data\":{\"email\":\"testmail@example.com\",\"name\":\"Pedro Pablo\",\"code\":\"590213490324i\"}}');
    expect(fakeSign).toHaveBeenCalled();
})