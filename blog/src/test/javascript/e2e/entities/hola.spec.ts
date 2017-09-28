import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';


describe('Hola e2e test', () => {

    let navBarPage: NavBarPage;
    let holaDialogPage: HolaDialogPage;
    let holaComponentsPage: HolaComponentsPage;


    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Holas', () => {
        navBarPage.goToEntity('hola');
        holaComponentsPage = new HolaComponentsPage();
        expect(holaComponentsPage.getTitle()).toMatch(/blogApp.hola.home.title/);

    });

    it('should load create Hola dialog', () => {
        holaComponentsPage.clickOnCreateButton();
        holaDialogPage = new HolaDialogPage();
        expect(holaDialogPage.getModalTitle()).toMatch(/blogApp.hola.home.createOrEditLabel/);
        holaDialogPage.close();
    });

    it('should create and save Holas', () => {
        holaComponentsPage.clickOnCreateButton();
        holaDialogPage.save();
        expect(holaDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class HolaComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-hola div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class HolaDialogPage {
    modalTitle = element(by.css('h4#myHolaLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
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
