import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Address e2e test', () => {

    let navBarPage: NavBarPage;
    let addressDialogPage: AddressDialogPage;
    let addressComponentsPage: AddressComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Addresses', () => {
        navBarPage.goToEntity('address');
        addressComponentsPage = new AddressComponentsPage();
        expect(addressComponentsPage.getTitle()).toMatch(/blogApp.address.home.title/);

    });

    it('should load create Address dialog', () => {
        addressComponentsPage.clickOnCreateButton();
        addressDialogPage = new AddressDialogPage();
        expect(addressDialogPage.getModalTitle()).toMatch(/blogApp.address.home.createOrEditLabel/);
        addressDialogPage.close();
    });

    it('should create and save Addresses', () => {
        addressComponentsPage.clickOnCreateButton();
        addressDialogPage.setIdaddressInput('5');
        expect(addressDialogPage.getIdaddressInput()).toMatch('5');
        addressDialogPage.setMainstreetInput('mainstreet');
        expect(addressDialogPage.getMainstreetInput()).toMatch('mainstreet');
        addressDialogPage.setNumberInput('5');
        expect(addressDialogPage.getNumberInput()).toMatch('5');
        addressDialogPage.setCpInput('5');
        expect(addressDialogPage.getCpInput()).toMatch('5');
        addressDialogPage.save();
        expect(addressDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AddressComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-address div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class AddressDialogPage {
    modalTitle = element(by.css('h4#myAddressLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    idaddressInput = element(by.css('input#field_idaddress'));
    mainstreetInput = element(by.css('input#field_mainstreet'));
    numberInput = element(by.css('input#field_number'));
    cpInput = element(by.css('input#field_cp'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setIdaddressInput = function (idaddress) {
        this.idaddressInput.sendKeys(idaddress);
    }

    getIdaddressInput = function () {
        return this.idaddressInput.getAttribute('value');
    }

    setMainstreetInput = function (mainstreet) {
        this.mainstreetInput.sendKeys(mainstreet);
    }

    getMainstreetInput = function () {
        return this.mainstreetInput.getAttribute('value');
    }

    setNumberInput = function (number) {
        this.numberInput.sendKeys(number);
    }

    getNumberInput = function () {
        return this.numberInput.getAttribute('value');
    }

    setCpInput = function (cp) {
        this.cpInput.sendKeys(cp);
    }

    getCpInput = function () {
        return this.cpInput.getAttribute('value');
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
