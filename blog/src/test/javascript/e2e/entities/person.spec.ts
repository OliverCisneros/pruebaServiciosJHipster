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

    it('should create and save People', () => {
        personComponentsPage.clickOnCreateButton();
        personDialogPage.setIdpersonInput('5');
        expect(personDialogPage.getIdpersonInput()).toMatch('5');
        personDialogPage.setNameInput('name');
        expect(personDialogPage.getNameInput()).toMatch('name');
        personDialogPage.setSurnameInput('surname');
        expect(personDialogPage.getSurnameInput()).toMatch('surname');
        personDialogPage.setImageInput(absolutePath);
        personDialogPage.addressSelectLastOption();
        personDialogPage.addressSelectLastOption();
        personDialogPage.save();
        expect(personDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

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
    nameInput = element(by.css('input#field_name'));
    surnameInput = element(by.css('input#field_surname'));
    imageInput = element(by.css('input#file_image'));
    addressSelect = element(by.css('select#field_address'));
    addressSelect = element(by.css('select#field_address'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setIdpersonInput = function (idperson) {
        this.idpersonInput.sendKeys(idperson);
    }

    getIdpersonInput = function () {
        return this.idpersonInput.getAttribute('value');
    }

    setNameInput = function (name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function () {
        return this.nameInput.getAttribute('value');
    }

    setSurnameInput = function (surname) {
        this.surnameInput.sendKeys(surname);
    }

    getSurnameInput = function () {
        return this.surnameInput.getAttribute('value');
    }

    setImageInput = function (image) {
        this.imageInput.sendKeys(image);
    }

    getImageInput = function () {
        return this.imageInput.getAttribute('value');
    }

    addressSelectLastOption = function () {
        this.addressSelect.all(by.tagName('option')).last().click();
    }

    addressSelectOption = function (option) {
        this.addressSelect.sendKeys(option);
    }

    getAddressSelect = function () {
        return this.addressSelect;
    }

    getAddressSelectedOption = function () {
        return this.addressSelect.element(by.css('option:checked')).getText();
    }

    addressSelectLastOption = function () {
        this.addressSelect.all(by.tagName('option')).last().click();
    }

    addressSelectOption = function (option) {
        this.addressSelect.sendKeys(option);
    }

    getAddressSelect = function () {
        return this.addressSelect;
    }

    getAddressSelectedOption = function () {
        return this.addressSelect.element(by.css('option:checked')).getText();
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
