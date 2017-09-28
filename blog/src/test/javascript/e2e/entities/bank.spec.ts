import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Bank e2e test', () => {

    let navBarPage: NavBarPage;
    let bankDialogPage: BankDialogPage;
    let bankComponentsPage: BankComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Banks', () => {
        navBarPage.goToEntity('bank');
        bankComponentsPage = new BankComponentsPage();
        expect(bankComponentsPage.getTitle()).toMatch(/blogApp.bank.home.title/);

    });

    it('should load create Bank dialog', () => {
        bankComponentsPage.clickOnCreateButton();
        bankDialogPage = new BankDialogPage();
        expect(bankDialogPage.getModalTitle()).toMatch(/blogApp.bank.home.createOrEditLabel/);
        bankDialogPage.close();
    });

   /* it('should create and save Banks', () => {
        bankComponentsPage.clickOnCreateButton();
        bankDialogPage.setIdBankInput('5');
        expect(bankDialogPage.getIdBankInput()).toMatch('5');
        bankDialogPage.setBanknameInput('bankname');
        expect(bankDialogPage.getBanknameInput()).toMatch('bankname');
        bankDialogPage.addressSelectLastOption();
        bankDialogPage.save();
        expect(bankDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); */

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BankComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-bank div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class BankDialogPage {
    modalTitle = element(by.css('h4#myBankLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    idBankInput = element(by.css('input#field_idBank'));
    banknameInput = element(by.css('input#field_bankname'));
    addressSelect = element(by.css('select#field_address'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setIdBankInput = function (idBank) {
        this.idBankInput.sendKeys(idBank);
    }

    getIdBankInput = function () {
        return this.idBankInput.getAttribute('value');
    }

    setBanknameInput = function (bankname) {
        this.banknameInput.sendKeys(bankname);
    }

    getBanknameInput = function () {
        return this.banknameInput.getAttribute('value');
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
