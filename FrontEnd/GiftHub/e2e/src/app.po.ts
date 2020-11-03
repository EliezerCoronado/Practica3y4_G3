import { browser, by, element } from 'protractor';

export class AppPage {

  private credentias = {
    username: 'user1',
    password: '123'
  };

  navigateTo() {
    return browser.get('/login') ;
  }

  navigateTo2() {
    return browser.get('/register') ;
  }

  getParagrapthText(): Promise<string> {
    return element(by.id('h2login')).getText() as Promise<string>;
  }

  getParagrapthText2(): Promise<string> {
    return element(by.id('h2registro')).getText() as Promise<string>;
  }

  fillCredentials(credentias: any = this.credentias) {
    element(by.id('userName')).sendKeys(credentias.username);
    element(by.id('passowrd')).sendKeys(credentias.password);
    element(by.id('logi')).click();
  }

  fillWrongCredentials(credentias: any = this.credentias) {
    element(by.id('userName')).sendKeys('wronguser');
    element(by.id('passowrd')).sendKeys('wrongpasswrd');
    element(by.id('logi')).click();
    return false;
  }



}
