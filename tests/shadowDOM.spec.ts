import {test,expect} from '@playwright/test'
test('ShaowDOM', async({page})=>{
    await page.goto('https://selectorshub.com/xpath-practice-page/');
    const userName = await page.getByPlaceholder('enter name',{exact:true});
    const pizzaName = await page.getByPlaceholder('Enter pizza name');
    await userName.fill('karuna');
    await pizzaName.fill('Home made pizza');
    console.log(await pizzaName.inputValue());

    const pizza = await page.locator('#pizza');
    await pizza.fill('Mozzarella pizza');

    console.log(await userName.inputValue());
    console.log(await pizza.inputValue());
    console.log(await pizzaName.inputValue());


})