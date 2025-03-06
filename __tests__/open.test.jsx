import { test, expect } from "vitest";
import Widget from "@hexlet/chatbot-v2";
import steps from "@hexlet/chatbot-v2/example-steps";
import { render, screen } from "@testing-library/react";

test("open chatbot", async () => {
    render(Widget(steps));
    const button = screen.getByRole('button', {name: /Открыть Чат/i});
    button.click();
    expect(document.body).toHaveTextContent("Виртуальный помощник");
});
