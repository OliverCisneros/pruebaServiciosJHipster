import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Person e2e test', () => {

    let navBarPage: NavBarPage;
    let personDialogPage: PersonDialogPage;
    let personComponentsPage: PersonComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load People', () => {
        navBarPage.goToEntity('person');
        personComponentsPage = new PersonComponentsPage();
        expect(personComponentsPage.getTitle()).toMatch(/blogApp.person.home.title/);

    });

    it('should load create Person dialog', () => {
        personComponentsPage.clickOnCreateButton();
        personDialogPage = new PersonDialogPage();
        expect(personDialogPage.getModalTitle()).toMatch(/blogApp.person.home.createOrEditLabel/);
        personDialogPage.close();
    });

   /* it('should create and save People', () => {
        personComponentsPage.clickOnCreateButton();
        personDialogPage.setIdpersonInput('5');
        expect(personDialogPage.getIdpersonInput()).toMatch('5');
        personDialogPage.setFnameInput('fname');
        expect(personDialogPage.getFnameInput()).toMatch('fname');
        personDialogPage.setLnameInput('lname');
        expect(personDialogPage.getLnameInput()).toMatch('lname');
        personDialogPage.addressPersonSelectLastOption();
        personDialogPage.bankSelectLastOption();
        personDialogPage.save();
        expect(personDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); */

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PersonComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-person div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PersonDialogPage {
    modalTitle = element(by.css('h4#myPersonLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    idpersonInput = element(by.css('input#field_idperson'));
    fnameInput = element(by.css('input#field_fname'));
    lnameInput = element(by.css('input#field_lname'));
    addressPersonSelect = element(by.css('select#field_addressPerson'));
    bankSelect = element(by.css('select#field_bank'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setIdpersonInput = function (idperson) {
        this.idpersonInput.sendKeys(idperson);
    }

    getIdpersonInput = function () {
        return this.idpersonInput.getAttribute('value');
    }

    setFnameInput = function (fname) {
        this.fnameInput.sendKeys(fname);
    }

    getFnameInput = function () {
        return this.fnameInput.getAttribute('value');
    }

    setLnameInput = function (lname) {
        this.lnameInput.sendKeys(lname);
    }

    getLnameInput = function () {
        return this.lnameInput.getAttribute('value');
    }

    addressPersonSelectLastOption = function () {
        this.addressPersonSelect.all(by.tagName('option')).last().click();
    }

    addressPersonSelectOption = function (option) {
        this.addressPersonSelect.sendKeys(option);
    }

    getAddressPersonSelect = function () {
        return this.addressPersonSelect;
    }

    getAddressPersonSelectedOption = function () {
        return this.addressPersonSelect.element(by.css('option:checked')).getText();
    }

    bankSelectLastOption = function () {
        this.bankSelect.all(by.tagName('option')).last().click();
    }

    bankSelectOption = function (option) {
        this.bankSelect.sendKeys(option);
    }

    getBankSelect = function () {
        return this.bankSelect;
    }

    getBankSelectedOption = function () {
        return this.bankSelect.element(by.css('option:checked')).getText();
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
