import { afterEach, beforeEach, describe, expect, jest, test } from '@jest/globals';
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import Home from '../../src/app/page';

describe('dashboard booking creation', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		cleanup();
		jest.useRealTimers();
	});

	test.each(['3', 'G'])('adds a booking with floor %s to My bookings', async (floor) => {
		render(<Home />);
		const form = within(screen.getByRole('region', { name: 'Create booking' }));
		const table = within(screen.getByRole('table', { name: 'Desk bookings' }));

		fireEvent.change(form.getByLabelText('Desk'), { target: { value: ' E14 ' } });
		fireEvent.change(form.getByLabelText('Floor'), { target: { value: ` ${floor} ` } });
		fireEvent.change(form.getByLabelText('Date'), { target: { value: '2099-01-01' } });
		fireEvent.click(form.getByRole('button', { name: 'Submit' }));

		expect(form.getByRole('button', { name: 'Submitting...' }).hasAttribute('disabled')).toBe(true);
		expect(table.queryByRole('rowheader', { name: 'E14' })).toBeNull();

		await act(async () => {
			jest.advanceTimersByTime(2000);
		});

		expect(table.getByRole('row', { name: `E14 ${floor} 2099-01-01 Active` })).toBeTruthy();
		expect(table.getAllByRole('row')).toHaveLength(7);
		expect(form.getByRole('status').textContent).toBe('Booking submitted successfully.');
		expect((form.getByLabelText('Desk') as HTMLInputElement).value).toBe('');
		expect((form.getByLabelText('Floor') as HTMLInputElement).value).toBe('');
		expect((form.getByLabelText('Date') as HTMLInputElement).value).toBe('');
	});

	test('does not add an invalid booking or display success', async () => {
		render(<Home />);
		const form = within(screen.getByRole('region', { name: 'Create booking' }));
		const table = within(screen.getByRole('table', { name: 'Desk bookings' }));

		fireEvent.click(form.getByRole('button', { name: 'Submit' }));
		await act(async () => {
			jest.advanceTimersByTime(2000);
		});

		expect(table.getAllByRole('row')).toHaveLength(6);
		expect(form.getAllByRole('alert')).toHaveLength(3);
		expect(form.getByRole('status').textContent).toBe('');
	});
});
