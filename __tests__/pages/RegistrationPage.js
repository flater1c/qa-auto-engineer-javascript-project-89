export default class RegistrationPage {
  constructor(screen, userEvent) {
    this.screen = screen;
    this.userEvent = userEvent;
  }

  get emailInput() {
    return this.screen.getByLabelText('Email');
  }

  get passwordInput() {
    return this.screen.getByLabelText('Пароль');
  }

  get addressInput() {
    return this.screen.getByLabelText('Адрес');
  }

  get cityInput() {
    return this.screen.getByLabelText('Город');
  }

  get countryDropdown() {
    return this.screen.getByRole('combobox');
  }

  get rulesCheckbox() {
    return this.screen.getByRole('checkbox');
  }

  get registrationButton() {
    return this.screen.getByRole('button', { name: /Зарегистрироваться/i });
  }

  async registration(data) {
    await this.userEvent.type(this.emailInput, data.email);
    await this.userEvent.type(this.passwordInput, data.password);
    await this.userEvent.type(this.addressInput, data.address);
    await this.userEvent.type(this.cityInput, data.city);
    await this.userEvent.selectOptions(this.countryDropdown, data.country);
    await this.userEvent.click(this.rulesCheckbox);
    await this.userEvent.click(this.registrationButton);
  }
}
