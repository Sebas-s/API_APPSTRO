import {methods as userController } from '../../src/controllers/user.controller';

jest.mock('promise-mysql', () => {
    return {
        createConnection: jest.fn().mockResolvedValue({
            query: jest.fn()
                .mockImplementationOnce((query) => Promise.resolve([{action:'get', query, message: 'OK'}])) // mocks used in getAstroById
                .mockImplementationOnce(() => Promise.resolve(['']))
                .mockImplementationOnce(() => {throw Error})
                .mockImplementationOnce((query) => Promise.resolve([{action:'get', query, message: 'OK'}]))  // mocks used in getAstrosByType
                .mockImplementationOnce(() => Promise.resolve(['']))
                .mockImplementationOnce(() => {throw Error})
                .mockImplementationOnce((query) => Promise.resolve([{action:'get', query , message: 'OK'}]))  // mocks used in getTypesAstro
                .mockImplementationOnce(() => Promise.resolve(['']))
                .mockImplementationOnce(() => {throw Error}),
            end: jest.fn(),
        }),
    }
});

const fakeRes = {
    status: jest.fn((code)=>fakeRes),
    send: jest.fn(),
    json: jest.fn(),
};

beforeEach(() => {
    fakeRes.status.mockClear();
    fakeRes.send.mockClear();
    fakeRes.json.mockClear();
})


describe('test of users routes controllers', () => {

    test('getAllUsers', async () => {
        const userQuery = {action:'get', message: 'OK', query: 'CALL getUsers;'};

        await userController.getAllUsers({}, fakeRes);
        await userController.getAllUsers({id: 2}, fakeRes);

        
        expect(fakeRes.json).toHaveBeenCalledWith(userQuery);
        expect(fakeRes.send).toHaveBeenCalled();

        await userController.getAllUsers({}, fakeRes);

        expect(fakeRes.status).toHaveBeenCalledWith(500);
        expect(fakeRes.send).toHaveBeenCalledTimes(2);

    });

    test('getSessionAcount', async () => {
        const userQuery = {action:'get', message: 'OK', query: 'CALL getSessionAcount(adminAndmin)', };
        const body = {
            email: 'apstro@example.com',
            contrasenia: 'adminAndmin',
        }

        await userController.getSessionAcount({ body }, fakeRes);
        await userController.getSessionAcount({ body }, fakeRes);

        expect(fakeRes.json).toHaveBeenCalledWith(userQuery);
        expect(fakeRes.send).toHaveBeenCalled();

        await userController.getSessionAcount({ body }, fakeRes);

        expect(fakeRes.status).toHaveBeenCalledWith(400);
        expect(fakeRes.send).toHaveBeenCalledTimes(2);

    });

});