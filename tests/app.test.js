import express from "express";
import Apstro from "../src/app";
import astroRoutes from "../src/routes/astro.routes";
import userRoutes from "../src/routes/user.routes";

const fakeGlobalConfig = {};

jest.mock('../src/routes/user.routes', () => {
    return jest.fn().mockImplementation(() => 'OK_USER');
});

jest.mock('../src/routes/astro.routes', () => {
    return jest.fn().mockImplementation(() => 'OK_ASTROS');
});

jest.mock('express', () => {
    return jest.fn().mockReturnValue({
        use: jest.fn(),
        set: jest.fn(),
        get: jest.fn(),
        listen: jest.fn(),
    });
});

express.json = jest.fn();

const useMock = jest.spyOn(express(), 'use');
const setMock = jest.spyOn(express(), 'set');
const getMock = jest.spyOn(express(), 'get');

test('testing of correct inicialization', () => {
    setMock.mockImplementationOnce((name, value) => {
        fakeGlobalConfig[name] = value;
    });
    getMock.mockImplementation((name) => fakeGlobalConfig[name]);

    Apstro.main();
    expect(useMock).toHaveBeenCalledTimes(4);
    expect(setMock).toHaveBeenLastCalledWith('port',3000);
    expect(getMock).lastCalledWith('port');

});