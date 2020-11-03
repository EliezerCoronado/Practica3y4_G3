import { AppPage } from './app.po';
import { browser, By, element, logging } from 'protractor';
import { PublicPage } from './public/public.po';

describe('Prueba de ruta login a register', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });


  
  it('Verifica que la etiquete contetenga Login', ()=>{
    page.navigateTo();

    expect(page.getParagrapthText()).toEqual('Login');
  
  });

  it('Debe navegar a la pagina de registro cuando se da click al boton', function () {
    page.navigateTo();
    browser.driver.wait(
      function() {
        return browser.driver.getCurrentUrl().then
        (function(url)
        {
            return (/register/).test(url);
        });
      });
      browser.driver.getCurrentUrl().then(function(text){console.log(text);});
      expect(browser.getCurrentUrl()).toContain('/register', 'Registration page opened');
  });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});


describe('Prueba de ruta register a Login', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });


  
  it('Verifica que la etiquete contetenga Register', ()=>{
    page.navigateTo2();

    expect(page.getParagrapthText2()).toEqual('Registro');
  
  });

  it('Debe navegar a la pagina de registro cuando se da click al boton', function () {
    page.navigateTo();
    browser.driver.wait(
      function() {
        return browser.driver.getCurrentUrl().then
        (function(url)
        {
            return (/login/).test(url);
        });
      });
      browser.driver.getCurrentUrl().then(function(text){console.log(text);});
      expect(browser.getCurrentUrl()).toContain('/login', 'Registration page opened');
  });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});



describe('Prueba de Login, fallido', () => {
  let page: AppPage;
  let publicPage:PublicPage;

  const wrongCredential ={
    username: 'wrongname',
    password: 'wrongpasswd'
  }

  beforeEach(() => {
    page = new AppPage();
    publicPage =  new PublicPage();
  });


  it('login incorrecto', function () {
    page.navigateTo();
    expect(page.fillWrongCredentials()).toBeFalse;

  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});



describe('Prueba de Login, correcto', () => {
  let page: AppPage;
  let publicPage:PublicPage;

  const wrongCredential ={
    username: 'wrongname',
    password: 'wrongpasswd'
  }

  beforeEach(() => {
    page = new AppPage();
    publicPage =  new PublicPage();
  });


  it('login correct', function () {
    page.navigateTo();
    page.fillCredentials();
    expect(publicPage.getPageTitleText()).toEqual('Tarjetas Disponibles')

  });


  

  it('Debe navegar a la pagina de home cuando se da click al boton', function () {
    page.navigateTo();
    browser.driver.wait(
      function() {
        return browser.driver.getCurrentUrl().then
        (function(url)
        {
            return (/login/).test(url);
        });
      });
      browser.driver.getCurrentUrl().then(function(text){console.log(text);});
      expect(browser.getCurrentUrl()).toContain('/login', 'Registration page opened');
  });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});


