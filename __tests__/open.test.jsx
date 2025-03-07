import { test, expect, describe } from "vitest";
import Widget from "@hexlet/chatbot-v2";
import steps from "../__fixtures__/steps.js";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'

describe('ChatBot', () => {
    beforeAll(() => {
        window.HTMLElement.prototype.scrollIntoView = vi.fn();
    });
    test('Renders correctly', async () => {
        render(Widget(steps));
        await waitFor(() => {
            expect(screen.getByText(/Открыть чат/i)).toBeInTheDocument();
        });
    })
    test('Windows opens and closes', async () => {
        render(Widget(steps));
        const openButton = screen.getByText(/Открыть чат/i);
        userEvent.click(openButton);
        await waitFor(() => {
            expect(screen.getByText('Виртуальный помощник')).toBeInTheDocument();
        });
        const closeButton = screen.getByRole('button', { name: /close/i });
        userEvent.click(closeButton);
        await waitFor(() => {
            expect(openButton).toBeInTheDocument();
        });
    });
    test('Switching steps', async () => {
        render(Widget(steps));
        const openButton = screen.getByText(/Открыть чат/i);
        userEvent.click(openButton);
        await waitFor(() => {
            expect(screen.getByText('Виртуальный помощник')).toBeInTheDocument();
        });
        const startButton = screen.getByRole('button', { name: /Начать разговор/i })
        userEvent.click(startButton);
        await waitFor(() => {
            expect(screen.getByText(/Сменить профессию или трудоустроиться/i)).toBeInTheDocument();
        });
        const changeProfessionButton = screen.getByText(/Сменить профессию или трудоустроиться/i);
        userEvent.click(changeProfessionButton);
        await waitFor(() => {
            expect(screen.getByText(/К концу обучения у вас будет портфолио на GitHub./i)).toBeInTheDocument();
            expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
        });
    })
});