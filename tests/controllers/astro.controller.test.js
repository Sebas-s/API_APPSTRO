import { methods as astroController } from '../../src/controllers/astro.controller';
import { createConnection } from 'promise-mysql';

jest.mock('promise-mysql', () => {
    return {
        createConnection: jest.fn().mockResolvedValue({
            query: jest.fn()
                .mockImplementationOnce((type) => Promise.resolve([{action:'get', id: type, message: 'OK'}])) // mocks used in getAstroById
                .mockImplementationOnce(() => Promise.resolve(['']))
                .mockImplementationOnce(() => {throw Error})
                .mockImplementationOnce((type) => Promise.resolve([{action:'get', id: type, message: 'OK'}]))  // mocks used in getAstrosByType
                .mockImplementationOnce(() => Promise.resolve(['']))
                .mockImplementationOnce(() => {throw Error})
                .mockImplementationOnce(() => Promise.resolve([{action:'get', id: "CALL getTypesAstro();", message: 'OK'}]))  // mocks used in getTypesAstro
                .mockImplementationOnce(() => Promise.resolve(['']))
                .mockImplementationOnce(() => {throw Error})
                .mockImplementationOnce(() => Promise.resolve('OK'))  // mocks used in deleteAstroById
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
});

describe('test gets routes of astroControllers', () => {

    test('getAstroById', async () => {

        const queryResult = {action:'get', id: 'call findAstroById(3);', message: 'OK'};
    
        await astroController.getAstroById({params: {id:3}}, fakeRes);
        await astroController.getAstroById({params: {id:2}}, fakeRes);
        
        expect(fakeRes.json).toHaveBeenCalledWith(queryResult);
        expect(fakeRes.send).toHaveBeenCalled();
    
        await astroController.getAstroById({params: {id:3}}, fakeRes)
        expect(fakeRes.status).toHaveBeenCalledWith(500);
        expect(fakeRes.send).toBeCalledTimes(2);
    
    });

    test('getAstrosByType', async () => {
        const queryResult = {action:'get', id: 'call getAstrosByType(3)', message: 'OK'};

        await astroController.getAstrosByType({params: {id:3}}, fakeRes);
        await astroController.getAstrosByType({params: {id:1}}, fakeRes);

        expect(fakeRes.json).toHaveBeenCalledWith(queryResult);
        expect(fakeRes.send).toHaveBeenCalled();

        await astroController.getAstrosByType({params: {id:3}}, fakeRes)
        expect(fakeRes.status).toHaveBeenCalledWith(500);
        expect(fakeRes.send).toBeCalledTimes(2);

    });

    test('getTypesAstro', async () => {
        const queryResult = {action:'get', id: 'CALL getTypesAstro();', message: 'OK'};

        await astroController.getTypeAstros({},fakeRes);
        await astroController.getTypeAstros({},fakeRes);

        expect(fakeRes.json).toHaveBeenCalledWith(queryResult);
        expect(fakeRes.send).toHaveBeenCalled();

        await astroController.getTypeAstros({}, fakeRes)
        expect(fakeRes.status).toHaveBeenCalledWith(500);
        expect(fakeRes.send).toBeCalledTimes(2);




    });

});

describe('delete routes', () => {

    test('deleteAstroById', async () => {
        await astroController.deleteAstroById({params: {id:3}}, fakeRes);

        expect(fakeRes.json).toHaveBeenCalledWith({ message: 'Astro deleted correctly'});
        expect(fakeRes.status).toHaveBeenCalledTimes(1);

        await astroController.deleteAstroById({params: {id:1}}, fakeRes);

        expect(fakeRes.status).lastCalledWith(500);
        expect(fakeRes.send).toHaveBeenCalled();

    });

});

