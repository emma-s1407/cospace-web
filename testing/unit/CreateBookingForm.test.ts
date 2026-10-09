import { describe, expect, test } from '@jest/globals';
import { validateBooking } from '../../src/components/CreateBookingForm';

describe('booking floor validation', () => {
	test.each(['3', 'G', '12', ' 3 '])('accepts a non-empty floor: %s', (floor) => {
		expect(validateBooking({ desk: 'A12', floor, date: '2099-01-01' })).toEqual({});
	});

	test.each(['', '   '])('rejects an empty floor: %s', (floor) => {
		expect(validateBooking({ desk: 'A12', floor, date: '2099-01-01' })).toEqual({
			floor: 'Floor must be at least 1 character long.',
		});
	});

	test('preserves desk and date validation', () => {
		expect(validateBooking({ desk: 'A', floor: '3', date: 'invalid' })).toEqual({
			desk: 'Desk name must be at least 3 characters long.',
			date: 'Enter a valid date.',
		});
	});
});
