export default class WidgetPage {
  constructor(screen, userEvent) {
    this.screen = screen;
    this.userEvent = userEvent;
  }

  get openChatButton() {
    return this.screen.getByRole('button', { name: /Открыть чат/i });
  }

  get closeChatButton() {
    return this.screen.getByRole('button', { name: /close/i });
  }

  get startChatButton() {
    return this.screen.queryByRole('button', { name: /Начать разговор/i });
  }

  get changeProfessionButton() {
    return this.screen.getByRole('button', { name: /Сменить профессию или трудоустроиться/i });
  }

  get tellMoreButton() {
    return this.screen.getByRole('button', { name: /Расскажи подробнее/i });
  }

  get somethingSimplerButton() {
    return this.screen.getByRole('button', { name: /А есть что-нибудь попроще/i });
  }

  get signUpForCourseButton() {
    return this.screen.getByRole('button', { name: /Останусь здесь, запишусь на курс/i });
  }

  get backToStartButton() {
    return this.screen.getByRole('button', { name: /Вернуться назад/i });
  }

  get backToStartFromTheEndButton() {
    return this.screen.getByRole('button', { name: /Верни меня в начало/i });
  }

  async openChat() {
    await this.userEvent.click(this.openChatButton);
  }

  async closeChat() {
    await this.userEvent.click(this.closeChatButton);
  }

  async startChat() {
    await this.userEvent.click(this.startChatButton);
  }

  async changeProfession() {
    await this.userEvent.click(this.changeProfessionButton);
  }

  async tellMore() {
    await this.userEvent.click(this.tellMoreButton);
  }

  async somethingSimpler() {
    await this.userEvent.click(this.somethingSimplerButton);
  }

  async signUpForCourse() {
    await this.userEvent.click(this.signUpForCourseButton);
  }

  async backToStart() {
    await this.userEvent.click(this.backToStartButton);
  }

  async backToStartFromTheEnd() {
    await this.userEvent.click(this.backToStartFromTheEndButton);
  }
}
