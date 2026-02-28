class GaragePage {
    constructor(page) {
        this.page = page;
        this.addCarButton = page.getByRole('button', { name: 'Add car' });
        this.carBrandSelect = page.locator('#addCarBrand');
        this.carModelSelect = page.locator('#addCarModel');
        this.carMileageInput = page.locator('#addCarMileage');
        this.addButton = page.getByRole('button', { name: 'Add' });
        this.addCarModal = page.locator('.modal-content');
    }

    async addCar(brand, model, mileage) {
        await this.addCarButton.click();
        await this.carBrandSelect.selectOption(brand);
        await this.carModelSelect.selectOption(model);
        await this.carMileageInput.fill(mileage);
        await this.addButton.click();
        await this.addCarModal.waitFor({ state: 'hidden' });
    }
}

module.exports = { GaragePage };