import {
    isValidCwLogEvent,
    processLogs
} from './';

import * as sampleEvents from './sample-events';

describe('isValidCwLogEvent()', () => {
    it('should return true if it is a valid event', () => {
        expect(isValidCwLogEvent(sampleEvents.cloudWatchLogsMockEvent)).toEqual(true);
    });

    it('should return false if it is an ivalid event (test for JS resiliency)', () => {
        // @ts-ignore
        expect(isValidCwLogEvent({})).toEqual(false);
        // @ts-ignore
        expect(isValidCwLogEvent({ awslogs: '' })).toEqual(false);
        // @ts-ignore
        expect(isValidCwLogEvent(null)).toEqual(false);
        // @ts-ignore
        expect(isValidCwLogEvent(undefined)).toEqual(false);
    });
});

describe('processLogs()', () => {
    it('should return the provided event if data is invalid (test for JS resiliency)', () => {
        // @ts-ignore
        expect(processLogs({})).toEqual({});
        // @ts-ignore
        expect(processLogs([])).toEqual([]);
        // @ts-ignore
        expect(processLogs(undefined)).toEqual(undefined);
        // @ts-ignore
        expect(processLogs(null)).toEqual(null);
    });

    it('should properly match the processed mock data', () => {
        expect(processLogs(
            sampleEvents.cloudWatchLogsMockEvent
        )).toEqual(
            sampleEvents.cloudWatchLogsMockEventProcessed
        );
    });
});
