import App from '../src/App';
import { test, expect, describe } from "vitest";
import Widget from "@hexlet/chatbot-v2";
import steps from "../__fixtures__/steps.js";
import emptySteps from "../__fixtures__/emptySteps.js";
import invalidSteps from "../__fixtures__/invalidSteps.js";
import registerData from '../__fixtures__/registerData.js';
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import RegistrationPage from "./pages/RegistrationPage.js";
import WidgetPage from "./pages/WidgetPage.js";

let widgetPage;
let registrationPage;

describe('Widget Positive Tests', () => {
    beforeEach(() => {
        window.HTMLElement.prototype.scrollIntoView = vi.fn();
        render(Widget(steps));
        widgetPage = new WidgetPage(screen, userEvent);
    });
    test('Widget renders correctly', async () => {
        await waitFor(() => {
            expect(widgetPage.openChatButton).toBeInTheDocument();
        });
    });
    test('Widget opens', async () => {
       await widgetPage.openChat();
       await waitFor(() => {
           expect(screen.getByText('Виртуальный помощник')).toBeInTheDocument();
       });
    });
    test('Widget closes', async () => {
       await widgetPage.openChat();
       await widgetPage.closeChat();
       await waitFor(() => {
           expect(widgetPage.openChatButton).toBeInTheDocument();
        });
    });
    test('Switching steps in widget', async () => {
        await widgetPage.openChat();
        await widgetPage.startChat();
        await widgetPage.changeProfession();
        await widgetPage.tellMore();
        await waitFor(() => {
           expect(screen.getByText(/Литералы, Операции, Типы данных/i)).toBeInTheDocument();
        });
        await widgetPage.signUpForCourse();
        await widgetPage.backToStartFromTheEnd();
        await waitFor(() => {
            expect(widgetPage.changeProfessionButton).toBeInTheDocument();
        })
        await widgetPage.changeProfession();
        await widgetPage.somethingSimpler();
        await waitFor(() => {
            expect(screen.getByText(/У нас есть подготовительные курсы/i)).toBeInTheDocument();
        });
        await widgetPage.backToStart();
        await waitFor(() => {
            expect(widgetPage.changeProfessionButton).toBeInTheDocument();
        });
    });
    test('Scroll Check', async () => {
        await widgetPage.openChat();
        await widgetPage.startChat();
        await widgetPage.changeProfession();
        await waitFor(() => {
            expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
        });
    });
});

describe('Widget Negative Tests', () => {
    beforeEach(() => {
        window.HTMLElement.prototype.scrollIntoView = vi.fn();
        widgetPage = new WidgetPage(screen, userEvent);
    })
    test('Widget rendering with empty steps', async () => {
        render(Widget(emptySteps));
        await widgetPage.openChat();
        expect(screen.queryByRole('button', { name: /Начать разговор/i })).not.toBeInTheDocument();
    });
    test('Invalid steps loaded to widget', async () => {
        await waitFor(() => {
            expect(() => {
                render(Widget(invalidSteps));
            }).toThrow(/e is not iterable/i);
        });
    });
});

describe('Integration Tests', () => {
    beforeEach(() => {
        window.HTMLElement.prototype.scrollIntoView = vi.fn();
        render(<App/>)
        registrationPage = new RegistrationPage(screen, userEvent);
        widgetPage = new WidgetPage(screen, userEvent);
    });
    test('Widget renders correctly within main app', async () => {
        await waitFor(() => {
            expect(widgetPage.openChatButton).toBeInTheDocument();
        });
    });
    test('Widget opens and closes correctly within main app', async () => {
        await widgetPage.openChat();
        await waitFor(() => {
            expect(screen.getByText('Виртуальный помощник')).toBeInTheDocument();
        });
        await widgetPage.closeChat();
        await waitFor(() => {
            expect(widgetPage.openChatButton).toBeInTheDocument();
        });
    });
    test('Signing up in main App', async () => {
        const userData = registerData();
        await registrationPage.registration(userData);
        await waitFor(async () => {
            expect(await screen.findByText(userData.email)).toBeInTheDocument();
            expect(screen.getByText(userData.address)).toBeInTheDocument();
            expect(screen.getByText(userData.city)).toBeInTheDocument();
            expect(screen.getByText(userData.country)).toBeInTheDocument();
            expect(screen.getByText(userData.acceptRules)).toBeInTheDocument();
        });
    });
});