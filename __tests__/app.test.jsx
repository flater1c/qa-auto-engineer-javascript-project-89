import App from '../src/App';
import { test, expect, describe } from "vitest";
import '@testing-library/jest-dom';
import Widget from "@hexlet/chatbot-v2";
import steps from "../__fixtures__/steps.js";
import emptySteps from "../__fixtures__/emptySteps.js";
import registerData from '../__fixtures__/registerData.js';
import { render, screen } from "@testing-library/react";
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
        expect(widgetPage.openChatButton).toBeVisible();
    });
    test('Widget opens', async () => {
       await widgetPage.openChat();
       expect(screen.getByText('Виртуальный помощник')).toBeVisible();
    });
    test('Widget closes', async () => {
       await widgetPage.openChat();
       await widgetPage.closeChat();
       expect(widgetPage.openChatButton).toBeVisible();
    });
    test('Switching steps in widget', async () => {
        await widgetPage.openChat();
        await widgetPage.startChat();
        await widgetPage.changeProfession();
        await widgetPage.tellMore();
        expect(screen.getByText(/Литералы, Операции, Типы данных/i)).toBeVisible();
        await widgetPage.signUpForCourse();
        await widgetPage.backToStartFromTheEnd();
        expect(widgetPage.changeProfessionButton).toBeVisible();
        await widgetPage.changeProfession();
        await widgetPage.somethingSimpler();
        expect(screen.getByText(/У нас есть подготовительные курсы/i)).toBeVisible();
        await widgetPage.backToStart();
        expect(widgetPage.changeProfessionButton).toBeVisible();
    });
    test('Scroll Check', async () => {
        await widgetPage.openChat();
        await widgetPage.startChat();
        await widgetPage.changeProfession();
        expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();
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
        expect(widgetPage.startChatButton).toBeNull();
    });
    test('Invalid steps loaded to widget', async () => {
        expect(() => {
            render(Widget(() => {
            }));
        }).toThrow();
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
        expect(widgetPage.openChatButton).toBeVisible();
    });
    test('Widget opens and closes correctly within main app', async () => {
        await widgetPage.openChat();
        expect(screen.getByText('Виртуальный помощник')).toBeVisible();
        await widgetPage.closeChat();
        expect(widgetPage.openChatButton).toBeVisible();
    });
    test('Signing up in main App', async () => {
        const userData = registerData();
        await registrationPage.registration(userData);
        expect(await screen.findByText(userData.email)).toBeVisible();
        expect(screen.getByText(userData.address)).toBeVisible();
        expect(screen.getByText(userData.city)).toBeVisible();
        expect(screen.getByText(userData.country)).toBeVisible();
        expect(screen.getByText(userData.acceptRules)).toBeVisible();

    });
});