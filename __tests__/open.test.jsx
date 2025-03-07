import App from '../src/App';
import { test, expect, describe } from "vitest";
import Widget from "@hexlet/chatbot-v2";
import steps from "../__fixtures__/steps.js";
import emptySteps from "../__fixtures__/emptySteps.js";
import invalidSteps from "../__fixtures__/invalidSteps.js";
import registerData from '../__fixtures__/registerData.js';
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'

describe('ChatBot', () => {
    beforeAll(() => {
        window.HTMLElement.prototype.scrollIntoView = vi.fn();
    });
    test('Renders correctly', async () => {
        render(<App/>);
        await waitFor(() => {
            expect(screen.getByText(/Открыть чат/i)).toBeInTheDocument();
        });
    })
    test('Windows opens and closes', async () => {
        render(<App/>);
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
        const startButton = screen.getByRole('button', { name: /Начать разговор/i });
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
    });
    test('Signing up in main App', async () => {
        const user = userEvent.setup();
        render(<App/>);
        const registerButton = screen.getByRole('button', { name: /Зарегистрироваться/i })
        await waitFor(() => {
           expect(registerButton).toBeInTheDocument();
        });
        await user.type(screen.getByLabelText("Email"), registerData().email);
        await user.type(screen.getByLabelText("Пароль"), registerData().password);
        await user.type(screen.getByLabelText("Адрес"), registerData().address);
        await user.type(screen.getByLabelText("Город"), registerData().city);
        await userEvent.selectOptions(screen.getByRole('combobox'), registerData().country);
        await userEvent.click(screen.getByRole('checkbox'));
        await userEvent.click(registerButton);
        await waitFor(async () => {
            expect(await screen.findByText(registerData().email)).toBeInTheDocument();
            expect(screen.getByText(registerData().address)).toBeInTheDocument();
            expect(screen.getByText(registerData().city)).toBeInTheDocument();
            expect(screen.getByText(registerData().country)).toBeInTheDocument();
            expect(screen.getByText(registerData().acceptRules)).toBeInTheDocument();
        });
    });
    test('Chatbot rendering with empty steps', async () => {
        render(Widget(emptySteps));
        await waitFor(() => {
            expect(screen.getByText(/Открыть чат/i)).toBeInTheDocument();
        });
        expect(screen.queryByRole('button', { name: /Начать разговор/i })).not.toBeInTheDocument();
    });
    test('Chatbot rendering with invalid steps', async () => {
        await waitFor(() => {
            expect(() => {
                render(Widget(invalidSteps));
            }).toThrow(/e is not iterable/i);
        });
    });
});