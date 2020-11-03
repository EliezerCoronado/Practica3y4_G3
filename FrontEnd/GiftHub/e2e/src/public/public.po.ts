import { browser, by, element } from 'protractor';

export class PublicPage {
  navigateTo() {
    return browser.get('/home'); // we can navigate to '/' for get pblic page since this is the default route
  }

  getPageTitleText() :Promise<string>{
    return element(by.id('h2disponible')).getText() as Promise<string>;
  }

}